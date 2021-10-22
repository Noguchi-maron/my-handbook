<template>
  <v-card class="py-10">
    <v-row justify="center">
      <v-col md="8" class="mx-auto">
        <v-card-title>新規登録</v-card-title>
        <v-text-field label="名前" v-model="user.name"></v-text-field>
        <v-text-field label="メールアドレス" v-model="email"></v-text-field>
        <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" :type="show ? 'text' : 'password'" @click:append="show = !show" v-model="pass" hint="6文字以上"></v-text-field>
        <v-row class="justify-space-between mt-4 mx-5">
          <v-btn elevation="0" @login="logIn">ログインする</v-btn>
        <v-btn color="primary" @click="signUp" elevation="0">新規保存</v-btn>

        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      user: {
        name: '',
        email: '',
        id: '',
      },
      email: '',
      pass: '',
      
    }
  },
  methods: {
    async signUp () {
      await this.$fb.auth().createUserWithEmailAndPassword(this.email, this.pass).then((userCredential) => {
        this.userData(userCredential)
        
        this.$router.push('/mypage')
      })
      .catch((e) => {
        const errorCode = e.code
        const errorMessage = e.message
      })
    },
    async userData (u) {
      this.user.email = u.user.email
      this.user.id = u.user.uid
      const collection = this.$fb.firestore().collection('users')
      await collection.doc(this.user.id).set({...this.user})
    },
    logIn () {
      this.$router.push('/login')
    }
  }
}
</script>
