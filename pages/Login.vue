<template>
  <div class="wrap">
    <v-card class="py-10">
    <v-row justify="center">
      <v-col md="8" class="mx-auto">
        <v-card-title>ログイン</v-card-title>
        <v-text-field label="メールアドレス" v-model="email" ></v-text-field>
        <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" :type="show ? 'text' : 'password'" @click:append="show = !show" v-model="pass"></v-text-field>
        <v-row class="justify-end mt-4 mx-5">
          <v-btn elevation="0" @login="login">ログインする</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
  </div>
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
    async login () {
      await this.$fb.auth().signInWithEmailAndPassword(this.email, this.pass).then((user) => {
        console.log('ok')
        this.$router.push('/mypage')
      })
      .chatch(() => {
        console.log('ログインできません')
      })
    }
  }
}
</script>