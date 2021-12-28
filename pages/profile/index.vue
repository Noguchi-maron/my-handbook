<template>
  <v-row justify="center" align="center">
    <v-col cols="11" sm="8">
      <v-card outlined class="py-8">
        <v-row justify="center">
          <v-col cols="10" md="8">
            <v-card-title>編集</v-card-title>
            <v-row>
              <v-col cols="5">
                <v-text-field label="名前" v-model="user.name"></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="user.exp"
              label="プロフィール"
              rows="3"
              auto-grow
            ></v-textarea>
            <v-row justify="end" class="mt-5">
              <v-btn color="primary" elevation="0" @click="setUser">保存</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      user: { name: "", exp: "" },
      userCollection: null
    };
  },
  async mounted() {
    this.getUser();
  },
  methods: {
    //ユーザー情報の取得
    async getUser() {
      this.userCollection = this.$fb
        .firestore()
        .collection("users")
        .doc(this.$store.getters.userId);
      const user = await this.userCollection.get();
      this.user = user.data();
    },
    //ユーザー情報の保存・送信
    async setUser() {
      this.userCollection.update({ name: this.user.name, exp: this.user.exp });
      console.log(this.user.exp);
      location.reload();
    }
  }
};
</script>
