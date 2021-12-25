<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="11" sm="8">
      <v-card class="py-10 px-5" outlined>
        <v-row justify="center">
          <v-col sm="9" md="8" class="mx-auto">
            <v-card-title>新規登録</v-card-title>
            <v-text-field label="名前" v-model="user.name"></v-text-field>
            <v-text-field label="メールアドレス" v-model="email"></v-text-field>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              v-model="pass"
              hint="6文字以上"
            ></v-text-field>
            <v-textarea
              v-model="user.exp"
              rows="2"
              label="自己紹介"
            ></v-textarea>
            <v-row class="justify-space-between mt-4">
              <LoginGoogle></LoginGoogle>
              <v-btn
                color="primary"
                @click="entry"
                elevation="0"
                :disabled="isDisabled"
                >新規保存</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LoginGoogle from "~/components/LoginGoogle.vue";
export default {
  data() {
    return {
      show: false,
      user: {
        name: "",
        id: "",
        exp: ""
      },
      email: "",
      pass: ""
    };
  },
  computed: {
    isDisabled() {
      if (this.user.name && this.email && this.pass.length >= 6) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    async entry() {
      const providers = await this.$fb
        .auth()
        .fetchSignInMethodsForEmail(this.email);
      if (
        providers.findIndex(
          p =>
            p === this.$fb.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        ) !== -1
      ) {
        window.confirm("このメールアドレスは既に登録されています");
      } else {
        this.signUp();
      }
    },
    async signUp() {
      await this.$fb
        .auth()
        .createUserWithEmailAndPassword(this.email, this.pass)
        .then(userCredential => {
          this.sendEmail();
          this.userData(userCredential.user);
        });
    },
    async sendEmail() {
      await this.$fb
        .auth()
        .currentUser.sendEmailVerification({
          //後で変える
          url: "https://my-handbook-328611.web.app/",
          handleCodeInApp: false
        })
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push("/emailConfirm");
        });
    },
    async userData(u) {
      this.user.id = u.uid;
      const collection = this.$fb.firestore().collection("users");
      await collection.doc(this.user.id).set({ ...this.user });
    },
    async googleLogin() {
      const provider = new this.$fb.auth.GoogleAuthProvider();
      await this.$fb
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.checkGoogleUser(result.user);
          this.$router.push("/mypage");
        })
        .catch(reject => {
          this.$router.push("/");
        });
    },
    async checkGoogleUser(user) {
      const userData = this.$fb
        .firestore()
        .collection("users")
        .doc(user.uid);
      await userData
        .get()
        .then(d => {
          if (!d.exists) {
            this.user.name = user.displayName;
            this.userData(user);
          } else {
            this.router.push("/mypage");
          }
        })
        .catch(() => {
        });
    }
  },
  components: { LoginGoogle }
};
</script>
