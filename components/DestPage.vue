<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="10" md="8">
      <v-card flat>
        <v-text-field class="mb-5"
          outlined hide-details="false"
          readonly
          v-model="item.name"
          label="施設・場所の名前"
        ></v-text-field>
        <v-row no-gutters justify="space-between">
          <v-col cols="8" md="4">
            <v-text-field
              outlined hide-details="false" class="mb-5"
              readonly
              v-model="item.postCode"
              label="郵便番号"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              outlined
              readonly hide-details="false"
              v-model="item.address"
              label="住所" class="mb-5"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6">
            <v-text-field
              outlined
              readonly hide-details="false"
              v-model="item.formatted_phone_number"
              label="電話番号" class="mb-5"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          outlined class="mb-5"
          readonly hide-details="false"
          v-model="item.website"
          label="ウェブサイト"
        ></v-text-field>
        <v-textarea
          rows="3"
          label="営業時間"
          v-model="item.opening_hours"
          auto-grow readonly
        ></v-textarea>
        <v-textarea
          rows="3"
          label="メモ"
          v-model="item.exp"
          counter
          maxlength="500"
          auto-grow
        ></v-textarea>
        <v-row dense class="justify-end mt-4 mr-5 mb-4" v-if="isAuthor">
          <v-btn
            color="primary"
            @click="submit"
            elevation="0"
            :disabled="canSubmit"
            >保存</v-btn
          >
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    authorId: String,
    bookId: String,
    destId: String
  },
  data() {
    return {
      item: {},
      date: this.$route.query.date,
    };
  },
  computed: {
    isAuthor () {
      if (this.$store.getters.userId === this.authorId) {
        return true 
      } else {
        return false
      }
    },
    canSubmit() {
      if (
        !this.item.name ||!this.item.address
      ) {
        return true;
      } else {
        false;
      }
    }
  },
  async mounted() {
    this.getDests();
  },
  methods: {
    //目的地の情報を取得する処理
    async getDests() {
      const destData = await this.$fb
        .firestore()
        .collection('users')
        .doc(this.authorId)
        .collection('books')
        .doc(this.bookId)
        .collection('dests')
        .doc(this.destId)
        .get()
      this.item = destData.data();
    },
    //変更内容の送信・保存
    async submit() {
      if (this.$store.getters.userId === this.authorId)
      await this.$fb.firestore().collection('users').doc(this.$store.getters.userId).collection('books').doc(this.$route.params.bookId).collection('dests').doc(this.$route.params.destId).update({...this.item}).then(() => {
        this.$router.push(`/mypage/${this.$route.params.bookId}`)
      })
    }
  }
};
</script>