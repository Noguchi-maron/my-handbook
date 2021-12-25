<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="11" sm="8">
      <div>
        <CommentForm :commentLists="comments" v-if="commentShow" :bookData="book" @commentClose="commentShow = false" @submitComment="commentShow = false"></CommentForm>
        <h2>ブックマーク</h2>
        <v-row class="justify-center mt-10" v-show="isActive">
          <v-col cols="10">
            <p>ブックマークに登録しているしおりはありません</p>
          </v-col>
        </v-row>
        <BookParts :itemList="items" @toBook="toBook" @updateBookmarks="updateBookmarks" @toProfile="toProfile" @getComments="getComments" v-if="isBookActive"></BookParts>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'
import BookParts from '~/components/BookParts.vue'

export default {
    data() {
        return {
            isActive: false,
            itemList: [],
            items: [],
            bookmarkCollection: null,
            comments: [],
            commentShow: false,
            book: {},
            isBookActive: false,
        };
    },
    computed: {
        ...mapGetters(["userId", "bookmarks"])
    },
    async mounted() {
        if (this.bookmarks.length !== 0) {
            this.isActive = false;
            this.setBooks();
        }
        else {
            this.isActive = true;
        }
    },
    methods: {
        //ブックマークのリストの順にbooksを取得する処理
        setBooks() {
            this.bookmarks.forEach((bookmark, i) => {
                this.getBooks(bookmark, i);
            });
        },
        //コメントを取得
        async getComments(item) {
            const comments = await this.$fb.firestore().collection("users").doc(this.userId).collection("books").doc(item.id).collection("comments").orderBy("created").get();
            this.comments = comments.docs.map(d => d.data());
            this.book = item;
            this.commentShow = true;
        },
        //booksを取得
        async getBooks(bookmark, i) {
            await this.$fb.firestore().collection("users").doc(bookmark.authorId).collection("books").doc(bookmark.id).get().then((book) => {
                if (book.exists) {
                    const item = book.data();
                    
                    this.items.push(item);
                    const index = i + 1;
                    if (index === this.bookmarks.length) {
                        this.isBookActive = true;
                    }
                }
                else {
                    window.alert(`「${book.title}」は削除されています`);
                    this.updateBookmarks(bookmark.id);
                }
            });
        },
        //しおり閲覧ページに遷移
        toBook(item) {
            this.$router.push(`/bookmark/${item.authorId}/${item.id}`);
        },
        //String型のdateデータをNumber型に変換
        setDate(v) {
            const dates = {
                year: Number(v.substr(0, 4)),
                month: Number(v.substr(5, 2)),
                date: Number(v.substr(8, 2))
            };
            const today = new Date();
            const thisYear = today.getFullYear();
            if (dates.year === thisYear) {
                return dates.month + "/" + dates.date;
            }
            else {
                return dates.year + "/" + dates.month + "/" + dates.date;
            }
        },
        //TimeStamp型をDate型に変換
        formatDate(date) {
            let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            return formatted_date;
        },
        //ブックマークへの登録・解除
        updateBookmarks(item, index) {
            this.$store.dispatch("updateBookmarks", item);

        },
        toProfile(id) {
            this.$router.push(`/bookmark/${id}`);
        },
    },
    components: { BookParts }
}
</script>

<style>
.theme--light.v-icon.color {
  color: #FFAB40;
} 
</style>
