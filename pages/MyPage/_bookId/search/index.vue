<template>
  <v-row justify="center" class="page-wrap" align="center">
    <v-col cols="11" md="7">
      <v-form>
        <v-container>
          <v-row align="center">
            <v-col cols="10" sm="6" md="5" class="px-0">
              <GmapAutocomplete @place_changed="getResult"></GmapAutocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card flat>
        <v-text-field
          outlined
          readonly
          v-model="result.name"
          label="施設・場所の名前"
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
              outlined
              readonly
              v-model="result.postCode"
              label="郵便番号"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              readonly
              v-model="result.address"
              label="住所"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              outlined
              readonly
              v-model="result.formatted_phone_number"
              label="電話番号"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          outlined
          readonly
          v-model="result.website"
          label="ウェブサイト"
        ></v-text-field>
        <v-textarea
          rows="3"
          label="営業時間"
          v-model="result.opening_hours"
          counter
          maxlength="500"
          auto-grow
        ></v-textarea>
        <v-textarea
          rows="3"
          label="メモ"
          v-model="result.exp"
          counter
          maxlength="500"
          auto-grow
        ></v-textarea>
        <v-row dense class="justify-end mt-4 mr-5">
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      waiting: false,
      items: [],
      result: {},
      readOnly: false,
      position: {}
    };
  },
  mounted() {
    this.date;
  },
  computed: {
    date() {
      return this.$route.query.date;
    },
    destsLength() {
      return this.$route.query.order;
    },
    canSubmit() {
      if (this.result.name) {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters(["userId"])
  },
  methods: {
    //検索内容を取得、表示
    getResult(v) {
      let address = v.formatted_address;
      let postCode = "";
      if (address.indexOf("日本") != -1) {
        postCode = address.slice(3, 11);
        address = address.slice(12);
      }
      const p = this.fixPositions(v.geometry.viewport);
      this.result = {
        name: v.name,
        date: Number(this.date) + 1,
        id: "",
        order: Number(this.destsLength) + 1,
        position: v.geometry.location,
        postCode: postCode,
        address: address,
        formatted_phone_number: null,
        website: "",
        opening_hours: "",
        exp: "",
        created: "",
        position: p
      };
      if (v.formatted_phone_number) {
        this.result.formatted_phone_number = v.formatted_phone_number;
      }
      if (v.website) {
        this.result.website = v.website;
      }
      if (v.opening_hours) {
        this.result.opening_hours =
          "営業時間：　" + v.opening_hours.weekday_text;
      }
    },
    //検索結果を送信・保存
    async submit() {
      const collection = this.$fb
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("books")
        .doc(this.$route.params.bookId)
        .collection(`dests`);
      const newDoc = collection.doc().id;
      this.result.id = newDoc;
      this.result.created = this.$fb.firestore.FieldValue.serverTimestamp();
      await collection.doc(newDoc).set({ ...this.result });
      this.$router.push(
        `/mypage/${this.$route.params.bookId}?date=${this.date}`
      );
    },
    //positionをJSONとして解析、オブジェクトに変換
    fixPositions(v) {
      const p = JSON.parse(JSON.stringify(v));
      const position = {
        lat: (p.north + p.south) / 2,
        lng: (p.west + p.east) / 2
      };
      return position;
    }
  }
};
</script>

<style scoped>
input.pac-target-input {
  padding: 10px 15px;
  border: 1px solid rgb(161, 161, 161);
  border-radius: 4px;
  width: 100%;
}

input.pac-target-input:focus {
  border: 2px solid #1976d2;
}
</style>
