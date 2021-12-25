<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="11" md="8">
      <CommentForm
        :commentLists="comments"
        v-if="commentShow"
        :bookData="book"
        @commentClose="commentShow = false"
        @submitComment="commentShow = false"
      ></CommentForm>
      <v-card class="py-5" flat>
        <v-row>
          <div class="text-overline mt-3 ml-5">
            <h3>{{ author.name }}</h3>
          </div>
        </v-row>
        <v-row height="200">
          <v-col>
            <h4 class="mb-3">プロフィール</h4>
            <v-card color="#f2f2f2" class="px-4 py3" height="150" flat>
              <p class="py-1 ma-0" v-show="!isExp">{{ author.exp }}</p>
              <p v-show="isExp" class="py-2 ma-0 exp-text">自己紹介など</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <h4 v-show="isShow" class="mb-3">しおり</h4>
              </v-col>
            </v-row>
            <v-card flat>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  v-for="item in items"
                  :key="item.id"
                >
                  <v-card outlined class="px-5 py-5">
                    <v-row class="justify-end mr-2">
                      <div class="text-overline text-right">
                        更新日： {{ item.update }}
                      </div>
                    </v-row>
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-text
                      >{{ item.firstDate }}~{{ item.lastDate }}</v-card-text
                    >
                    <v-card-actions class="justify-space-between">
                      <v-btn
                        elevation="0"
                        color="primary"
                        @click="toBookId(item)"
                        >開く</v-btn
                      >
                      <div>
                        <span>
                          <v-icon @click="getComments(item)"
                            >mdi-comment-outline</v-icon
                          >
                        </span>
                        <span>
                          <v-icon
                            :class="{ color: item.isBookmark }"
                            @click="updateBookmarks(item, index)"
                            >mdi-bookmark-multiple</v-icon
                          >
                        </span>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    authorId: String,
    page: String
  },
  data() {
    return {
      author: {},
      initial: "",
      user: null,
      items: [],
      isShow: true,
      isExp: false,
      commentShow: false,
      comments: []
    };
  },
  mounted() {
    this.getauthor();
    this.getBooks();
  },
  methods: {
    //userのcollectionをset
    getUser() {
      this.user = this.$fb
        .firestore()
        .collection("users")
        .doc(this.authorId);
    },
    //userデータを取得
    async getauthor() {
      const user = await this.$fb
        .firestore()
        .collection("users")
        .doc(this.authorId)
        .get();
      this.author = user.data();
      if (!this.author.exp) {
        this.isExp = true;
      }
    },
    //しおりを取得
    async getBooks() {
      const books = await this.$fb
        .firestore()
        .collection("users")
        .doc(this.authorId)
        .collection("books")
        .orderBy("update", "desc")
        .get();
      this.items = books.docs.map(d => d.data());
      this.items.forEach(item => {
        item.firstDate = this.setDate(item.firstDate);
        item.lastDate = this.setDate(item.lastDate);
        item.update = this.formatDate(item.update.toDate());
      });
    },
    //TimeStamp型をDate型に変換
    formatDate(date) {
      let formatted_date =
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      return formatted_date;
    },
    //しおりの閲覧ページに遷移
    toBookId(id) {
      this.$router.push(`/${this.page}/${this.authorId}/${id}`);
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
      } else {
        return dates.year + "/" + dates.month + "/" + dates.date;
      }
    },
    //コメントの取得
    async getComments(item) {
      const comments = await this.$fb
        .firestore()
        .collection("users")
        .doc(item.authorId)
        .collection("books")
        .doc(item.id)
        .collection("comments")
        .get();
      this.comments = comments.docs.map(d => d.data());
      this.book = item;
      this.commentShow = true;
    }
  }
};
</script>

<style>
.exp-text {
  color: #adadad;
}
</style>
