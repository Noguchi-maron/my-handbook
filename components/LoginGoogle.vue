<template>
  <v-btn elevation="0" @click="googleLogin">
            <span class="blue--text text--darken-2">G</span><span class="red--text text-darken-2">o</span><span class="yellow--text text-darken-2">o</span><span class="blue--text text--darken-2">g</span><span class="green--text text--darken-2">l</span><span class="red--text text--darken-2">e</span>でログイン</v-btn>
</template>

<script>
export default {
  data () {
    return {
      user: {
                name: "",
                id: "",
                exp: "",
            },
    }
  },
  methods: {
    //グーグルアカウントによるログイン
    async googleLogin () {
      const provider = new this.$fb.auth.GoogleAuthProvider()
      await this.$fb.auth().signInWithPopup(provider).then((result) => {
        this.checkGoogleUser(result.user)
        this.$router.push('/mypage')
      })
      .catch((reject) => {
        this.$router.push('/')
      })
    },
    //初のログインかを調べる
    async checkGoogleUser (user) {
      const userData = this.$fb.firestore().collection('users').doc(user.uid)
      await userData.get().then(d => {
        if(!d.exists) {
          this.user.name = user.displayName
          this.submitUserData(user)
          this.router.push('/mypage')
        } else {
          this.$store.dispatch('getUser',  user.uid)
          this.router.push('/mypage')
        }
      })
    },
    //ユーザーデータを送信・保存
    async submitUserData(user) {
        this.user.id = user.uid;
        const collection = this.$fb.firestore().collection("users");
        await collection.doc(this.user.id).set({ ...this.user });
    },
  }
}
</script>