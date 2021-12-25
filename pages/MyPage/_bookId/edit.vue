<template>
  <v-row align="center" justify="center">
    <v-col cols="11" md="8">
      <v-sheet color="blue" class="darken-4" outlined rounded>
        <v-card class="py-10" outlined>
          <v-form>
            <v-row>
              <v-col cols="11" md="8" class="mx-auto">
                <v-card-title>編集</v-card-title>
                <v-text-field
                  label="しおりの名前"
                  counter
                  maxlength="25"
                  v-model="form.title"
                ></v-text-field>
                <v-file-input
                  label="File input"
                  prepend-icon="mdi-camera"
                  accept=".png, .jpeg, .jpg"
                  v-model="image"
                ></v-file-input>
                <v-row>
                  <v-col cols="7">
                    <v-select
                      multiple
                      v-model="form.selectPref"
                      :items="prefectures"
                      label="エリア選択"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row dense class="align-center">
                  <v-col cols="5">
                    <v-menu
                      ref="menu"
                      v-model="firstDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.firstDate"
                          label="初日"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details="none"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.firstDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="firstDateMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(form.firstDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <div class="text-center">～</div>
                  </v-col>
                  <v-col cols="5">
                    <v-menu
                      ref="menu"
                      v-model="lastDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.lastDate"
                          label="最終日"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details="none"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.lastDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="lastDateMenu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(form.lastDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row dense class="justify-end mt-4">
                  <v-btn
                    elevation="0"
                    color="primary"
                    @click.prevent="submit"
                    :disabled="canSubmit"
                    >保存</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      firstDateMenu: false,
      lastDateMenu: false,
      image: null,
      date: "",
      book: null,
      prefectures: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県",
        "海外"
      ],
      selectPref: []
    };
  },
  computed: {
    userId() {
      return this.$store.getters.user.id;
    },
    //urlを設定
    url() {
      if (this.image === null) {
        return "";
      } else {
        return URL.createObjectURL(this.image);
      }
    },
    //送信可能かを検証するboolean
    canSubmit() {
      if (
        !this.form.title ||
        this.form.title.length > 25 ||
        this.form.exp.length > 200 ||
        !this.form.firstDate ||
        this.form.selectPref === []
      ) {
        return true;
      } else {
        false;
      }
    }
  },
  mounted() {
    this.book = this.$fb
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("books")
      .doc(this.$route.params.bookId);
    this.getForm();
  },
  methods: {
    //しおりの情報を取得
    async getForm() {
      await this.book.get().then(book => {
        if (book.exists) {
          this.form = book.data();
        }
      });
    },
    //入力内容の送信・保存
    async submit() {
      if (
        !this.form.title ||
        this.form.title.length > 25 ||
        this.form.exp.length > 200 ||
        !this.form.firstDate ||
        !this.form.selectPref
      ) {
        return;
      }
      this.form.update = this.$fb.firestore.FieldValue.serverTimestamp();

      await this.book.update({
        title: this.form.title,
        photo: this.url,
        firstDate: this.form.firstDate,
        lastDate: this.form.lastDate,
        exp: this.form.exp,
        update: this.form.update
      });
      this.$router.push(`/mypage/${this.$route.params.bookId}`);
    }
  }
};
</script>
