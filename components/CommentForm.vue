<template>
  <div v-resize="resizeWindow">
    <div class="mask" @click="$emit('commentClose')"></div>
    <v-row justify="center" class="fixed">
      <v-col cols="11" sm="9" md="7">
        <v-card shaped class=" pb-10">
          <v-row justify="center">
            <v-col cols="11" md="10">
              <v-row justify="space-between">
          <v-card-title class="d-inline-block">コメント</v-card-title>
              <v-icon class="on-click ml-a" @click="$emit('commentClose')" x-large>mdi-close</v-icon>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card flat class="scroll py-4" :style="{maxHeight: maxHeight + 'px'}">
            <ul class="pa-0">
              <li v-for="(comment, i) in comments" :key="comment.id">
                <v-row dense justify="center"> 
                  <v-col cols="10" md="8">
                <p>{{ comment.author }}</p>
                <div>
                <p class="d-flex justify-space-between"><span>{{ comment.text }}</span><span class="red--text on-click" @click="deleteComment(comment, i)" v-if="comment.deleteBtn">[ 削除 ]</span></p>
                </div>
                <v-divider></v-divider>
                  </v-col>
                </v-row>
              </li>
            </ul>
          </v-card>
          <v-form class="pt-5">
            <v-row justify="center">
              <v-col cols="10" md="8">
                <v-row>
                  <v-col cols="5">
                    <v-text-field outlined v-model="user.name" readonly hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                <v-textarea v-model="comment" rows="3" outlined label="コメント" hide-details></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-btn @click="submit" color="primary" elevation="0">送信</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    commentLists: Array,
    bookData: Object,
  },
  data () {
    return {
      comments: this.commentLists,
      comment: '',
      collection: null,
      maxHeight: 200,
    }
  },
  mounted () {
    this.setDeleteBtn()
    this.collection = this.$fb.firestore().collection('users').doc(this.bookData.authorId).collection('books').doc(this.bookData.id).collection('comments')
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    //自身のコメントにのみ削除ボタンを表示する処理
    setDeleteBtn () {
      this.comments.forEach(com => {
        this.$set(com, 'deleteBtn', false)
        if(com.authorId === this.user.id) {
          com.deleteBtn = true
        }
      })
    },
    //コメントの送信・保存
    async submit () {
      if(this.comment === '') {
        return
      }
      const newDoc = this.collection.doc().id
      const comment = {
        author: this.user.name,
        authorId: this.user.id,
        created: this.$fb.firestore.FieldValue.serverTimestamp(),
        id: newDoc,
        text: this.comment,
      }
      await this.collection.doc(newDoc).set({...comment })
      this.$emit('submitComment')
    },
    //コメントの削除
    async deleteComment (comment, i) {
      if(window.confirm('削除してよろしいですか')) {
        await this.collection.doc(comment.id).delete()
        this.comments.splice(i, 1)
      }
    },
    resizeWindow () {
      this.maxHeight = window.innerHeight - 450 
    }
  }
}
</script>

<style scoped>
div.mask {
  background-color: rgba(0, 0, 0, 0.7);;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
}

.comment-form {
  overflow-y: scroll;
  scrollbar-width: none;
}

.fixed {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
</style>