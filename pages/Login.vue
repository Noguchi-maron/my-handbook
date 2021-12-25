<template>
  <v-row justify="center" align="center">
    <v-col cols="11" sm="8">
        <v-card outlined class="pb-10">
          <v-btn elevation="0" @click="toSignup" text color="primary">＜新規登録する</v-btn>
          <v-row justify="center">
            <v-col cols="10" md="8">

              <v-card-title>ログイン</v-card-title>
              <v-text-field label="メールアドレス" v-model="email" ></v-text-field>
              <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" :type="show ? 'text' : 'password'" @click:append="show = !show" v-model="pass"></v-text-field>
            </v-col>
          </v-row>
              <v-row justify="center">
                <v-col cols="10" md="9">
                  <v-row justify="space-between">
                <LoginGoogle></LoginGoogle>
                <v-btn elevation="0" @click="login" color="primary">ログイン</v-btn>

                  </v-row>
                </v-col>
              </v-row>

            
        </v-card>
      </v-col>
    </v-row>
      
</template>

<script>
export default {
  data () {
    return {
      show: false,
      email: '',
      pass: '',
      match: true,

    }
  },
  computed: {
    
    
  },
  methods: {
    //ログイン処理
    async login () {
      await this.$fb.auth().signInWithEmailAndPassword(this.email, this.pass).then(user => {
        if (this.email === 'test-user@test.com') {
          this.$router.push('/mypage')
          } else {
            this.emailConfirm()
        }
      })
      .catch(() => {
        window.alert('メールアドレス又はパスワードが間違っています')
      })
    },
    //新規登録画面に遷移
    toSignup () {
      this.$router.push('/signup')
    },
    //認証メールを送信
    async sendEmail () {
      await this.$fb.auth().currentUser.sendEmailVerification({
        url: 'https://my-handbook-328611.web.app/timeline',
        handleCodeInApp: false
      })
      .then(() => {
        this.$store.dispatch('logout')
        this.$router.push('/emailconfirm')
      })
    },
    //メールアドレスを認証済みかを確認
    async emailConfirm () {
      const confirm = await this.$fb.auth().currentUser.emailVerified
      if (confirm) {
        this.$router.push('/mypage')
      } else {
        this.sendEmail()
      }
    },
  }
}
</script>