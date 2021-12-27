<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="11" md="8">
      <CommentForm :commentLists="comments" v-if="commentShow" :bookData="book" @commentClose="commentShow = false" @submitComment="commentShow = false"></CommentForm>
      <h2 class="mb-4">マイページ</h2>
        <v-btn elevation="0" color="primary" @click="toCreate">新規作成</v-btn>
        <v-btn elevation="0" color="error" text @click="isEdit = !isEdit" class="ml-5" v-show="!isEdit">編集</v-btn>
        <v-btn elevation="0" color="error" text @click="isEdit = !isEdit" class="ml-5" v-show="isEdit">完了</v-btn>
        <div class="py-5">
      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="(item, i) in items" :key="i">
          <v-card outlined  class="px-5 pt-3 pb-5">
            <v-row class="justify-center">
              <v-col cols="10">
                
              </v-col>
            </v-row>
            <v-row class="justify-end mr-2">
              <div class="text-overline text-right">更新日： {{ item.update}}</div>
            </v-row>
            <v-row height="200" justify="center">
              <v-col cols="11">
                <v-img :src="item.photo" height="180">
                </v-img>
              </v-col>
            </v-row>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text class="py-0"><span v-for="(pref, i) in item.selectPref" :key="pref"><span v-show="i !== 0">, </span>{{pref}}</span></v-card-text>
            <v-row>
              <v-col cols="10">
            <v-card-text class="py-0">{{ item.firstDate }}~{{ item.lastDate }}</v-card-text>
              </v-col>
            </v-row>
            
            <v-card-actions class="justify-space-between">
              <v-btn elevation="0" color="primary" @click="toBookId(item.id)" :disabled="isEdit">開く</v-btn>
            <span v-show="!isEdit">
              <v-icon @click="getComments(item)">mdi-comment-outline</v-icon>
            </span>
              <v-btn elevation="0" color="error" text @click="deleteBook(item.id, i)" v-show="isEdit">削除</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      items: null,
      isEdit: false,
      bookCollection: null,
      comments: [],
      commentShow: false,
      book: {},
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },

  mounted () {
    this.bookCollection = this.$fb.firestore().collection('users').doc(this.userId).collection('books')
    this.getBook()
    
  },
  methods: {
    //しおりを取得
    async getBook () {
      const books = await this.bookCollection.orderBy('update', 'desc').get()
      this.items = books.docs.map(bookData => bookData.data())
      this.items.forEach(item => {
        item.firstDate = this.convertStirngDate(item.firstDate)
        item.lastDate = this.convertStirngDate(item.lastDate)
        item.update = this.convertTimeStamp(item.update.toDate())
        if(!item.photo) {
          item.photo = require('@/assets/img/pastel_00019.jpg')
        }
      })
    },
    //コメントを取得
    async getComments (item) {
      const comments = await this.bookCollection.doc(item.id).collection('comments').orderBy('created').get()
      this.comments = comments.docs.map(d => d.data())
      this.book = item
      this.commentShow = true
    },
    //しおりを閲覧するページに移動
    toBookId (id) {
      const date = this.$fb.firestore.FieldValue.serverTimestamp()
      this.bookCollection.doc(id).update({update: date})
      this.$router.push(`/mypage/${id}`)
    },
    toCreate () {
      this.$router.push('/mypage/create')
    },
    //しおりを削除する
    async deleteBook (id, i) {
      if(window.confirm('このしおりを削除します。よろしいですか')) {
        await this.bookCollection.doc(id).delete()
        this.items.splice(i, 1)
      }
    },
    //取得したdateを数字に変換
    convertStirngDate (v) {
      const dates = {
        year: Number(v.substr(0, 4)),
        month: Number(v.substr(5, 2)),
        date: Number(v.substr(8, 2))
      }
      const today = new Date()
      const thisYear = today.getFullYear()
      if(dates.year === thisYear) {
        return dates.month + "/" + dates.date
      } else {
        return dates.year + "/" + dates.month + "/" + dates.date
      }
    },
    //タイムスタンプをDate型に変換
    convertTimeStamp(date) {
      let formatted_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
        return formatted_date
    }
  }
}
</script>
