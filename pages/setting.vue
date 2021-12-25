<template>
  <v-row justify="center" class="page-wrap">
    <v-col cols="11" sm="8">
      <div>
        <v-row justify="center">
          <v-col cols="8">
            <v-card flat>
              <v-row>
                <h2>設定</h2>
              </v-row>
              <v-row class="mt-10">
                <h4>パスワードの再設定</h4>
              </v-row>
              <v-row class="mt-5">
                <v-btn elevation="0" @click="passReset"
                  >パスワード再設定のメールを送信</v-btn
                >
              </v-row>

              <v-row class="mt-10">
                <h4>アカウントを削除</h4>
              </v-row>
              <v-row class="mt-5">
                <v-btn elevation="0" color="error" @click="deleteUser"
                  >削除</v-btn
                >
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userId", "email"])
  },
  methods: {
    //パスワードをリセットする処理
    async passReset() {
      const urlSetting = {
        url: "https://my-handbook-328611.web.app/timeline",
        handleCodeInApp: false
      };
      await this.$fb
        .auth()
        .sendPasswordResetEmail(this.email, urlSetting)
        .then(() => {
          this.$router.push("/emailconfirm");
        })
        .catch(error => {
        });
    },
    //アカウントを削除する処理
    async deleteUser() {
      if (
        window.confirm(
          "アカウントを削除します。よろしいですか？\n※Googleアカウントからログインしている場合は、パスワードの変更を行って下さい"
        )
      ) {
        const pass = window.prompt("パスワードを入力してください");
        if (pass === "") {
          window.alert("空の入力欄が送信されました");
          return;
        } else if (pass === null) {
          window.alert("キャンセルされました");
          return;
        }
        const user = this.$fb.auth().currentUser;
        const credential = this.$fb.auth.EmailAuthProvider.credential(
          this.email,
          pass
        );
        await user
          .reauthenticateWithCredential(credential)
          .then(() => {
            this.deleteUserData(user);
          })
          .catch(error => {
            window.alert("パスワードが正しくありません");
          });
      }
    },
    //firestoreにあるユーザー情報を削除する処理
    async deleteUserData(user) {
      await user.delete();
      local.reload();
    }
  }
};
</script>
