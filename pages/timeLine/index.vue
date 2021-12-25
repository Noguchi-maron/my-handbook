<template>
  <v-row justify="center" class="page-wrap" v-resize="resizeWindow">
    <v-col cols="11" md="8">
      <CommentForm
        :commentLists="comments"
        v-if="commentShow"
        :bookData="book"
        @commentClose="commentShow = false"
        @submitComment="commentShow = false"
      ></CommentForm>
      <v-row align="center" justify-sm="space-between">
        <h2>タイムライン</h2>
        <v-col cols="12" md="7">
          <v-row justify="center" justify-sm="end">
            <v-col cols="10">
              <v-select
                label="エリア選択"
                multiple
                :items="prefectures"
                v-model="selectPref"
                dense
                hide-details="none"
                @change="searchPref"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="py-5">
        <v-row justify="center" justify-sm="start">
          <p v-show="!booksExists">条件に合致するしおりはありません</p>
        </v-row>
        <BookParts
          :itemList="items"
          @toBook="toBook"
          @updateBookmarks="updateBookmarks"
          @toProfile="toProfile"
          @getComments="getComments"
          v-if="isBookActive"
        ></BookParts>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import BookParts from "~/components/BookParts.vue";
export default {
  data() {
    return {
      items: [],
      collection: null,
      comments: [],
      commentShow: false,
      book: {},
      prefectures: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県",
        "海外"
      ],
      selectPref: [],
      windowWidth: 0,
      searchText: "",
      booksExists: true,
      isBookActive: false
    };
  },
  computed: {
    ...mapGetters(["userId", "isAuthenticated"])
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    //timelineに表示するbooksの取得
    async getBooks() {
      const books = await this.$fb
        .firestore()
        .collectionGroup("books")
        .orderBy("update", "desc")
        .limit(40)
        .get();
      this.items = books.docs.map(book => book.data());
      this.isBookActive = true;
    },
    //ウィンドウサイズの変更を検知
    resizeWindow() {
      this.windowWidth = window.innerWidth;
    },
    //エリアで検索
    async searchPref() {
      this.isBookActive = false;
      if (this.selectPref.length === 0) {
        this.booksExists = true;
        this.getBooks();
      } else {
        this.booksExists = true;
        const books = await this.$fb
          .firestore()
          .collectionGroup("books")
          .where("selectPref", "array-contains-any", this.selectPref)
          .orderBy("update", "desc")
          .limit(40)
          .get();
        this.items = books.docs.map(d => d.data());
        if (this.items.length !== 0) {
          this.isBookActive = true;
        } else {
          this.booksExists = false;
        }
      }
    },
    //しおりの閲覧ページに遷移
    toBook(item) {
      this.$router.push(`/timeline/${item.authorId}/${item.id}`);
    },
    //ブックマークの登録・解除
    async updateBookmarks(item) {
      this.$store.dispatch("updateBookmarks", item);
    },
    //コメントを取得する
    async getComments(item) {
      const comments = await this.$fb
        .firestore()
        .collection("users")
        .doc(item.authorId)
        .collection("books")
        .doc(item.id)
        .collection("comments")
        .orderBy("created")
        .get();
      this.comments = comments.docs.map(d => d.data());
      this.book = item;
      this.commentShow = true;
    },
    //プロフィール閲覧ページに遷移
    toProfile(id) {
      if (this.isAuthenticated) {
        this.$router.push(`/timeline/${id}`);
      }
    }
  },
  components: { BookParts }
};
</script>
