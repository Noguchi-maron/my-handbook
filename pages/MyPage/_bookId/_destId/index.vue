<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="10" md="8">
      <v-card flat>
        <v-row class="mb-5" no-gutters>
          <v-col cols="7" md="6">
            <v-text-field hide-details="false"
              outlined
              v-model="item.name"
              label="施設・場所の名前"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field class="mb-5"
          outlined hide-details="false"
          v-model="item.address"
          label="住所"
        ></v-text-field>
        <v-row class="mb-5" no-gutters>
          <v-col cols="6">
            <v-text-field
              outlined hide-details="false"
              v-model="item.formatted_phone_number"
              label="電話番号"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          outlined hint="false" 
          hide-details="false"
          v-model="item.website"
          label="ウェブサイト"
        ></v-text-field>
        <v-textarea
          rows="3" class="mt-0"
          label="営業時間"
          v-model="item.opening_hours"
        ></v-textarea>
        <v-textarea rows="3" label="メモ" v-model="item.exp"></v-textarea>
        <v-row dense class="justify-end mt-4 mr-5">
          <v-btn color="primary" @click="submit" elevation="0" :disabled="canSubmit" >保存</v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      date: this.$route.query.date
    };
  },
  computed: {
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
      const d = await this.$fb
        .firestore()
        .collection('users')
        .doc(this.$store.getters.userId)
        .collection('books')
        .doc(this.$route.params.bookId)
        .collection('dests')
        .doc(this.$route.params.destId)
        .get()
      this.item = d.data();
    },
    async submit() {
      await this.$fb.firestore().collection('users').doc(this.$store.getters.userId).collection('books').doc(this.$route.params.bookId).collection('dests').doc(this.$route.params.destId).update({...this.item}).then(() => {
        this.$router.push(`/mypage/${this.$route.params.bookId}`)
      })
    }
  }
};
</script>
