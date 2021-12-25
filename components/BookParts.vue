<template>
  <v-row>
    <v-col cols="12" sm="6" lg="4" v-for="(item, i) in items" :key="item.id">
      <v-card outlined class="px-5 py-5">
        <v-row class="justify-end mr-2">
          <div class="text-overline text-right">更新日： {{ item.update }}</div>
        </v-row>
        <v-row height="180" justify="center">
          <v-col cols="11">
            <v-img :src="item.photo" height="180"> </v-img>
          </v-col>
        </v-row>
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text class="py-0"
          ><span v-for="(pref, i) in item.selectPref" :key="pref"
            ><span v-show="i !== 0">, </span>{{ pref }}</span
          ></v-card-text
        >
        <v-card-text class="py-0"
          >{{ item.firstDate }}~{{ item.lastDate }}</v-card-text
        >
        <v-card-actions class="justify-space-between mb-3">
          <v-btn elevation="0" color="primary" @click="$emit('toBook', item)"
            >開く</v-btn
          >
          <div>
            <span v-show="isAuthenticated">
              <v-icon @click="$emit('getComments', item)"
                >mdi-comment-outline</v-icon
              >
            </span>
            <span v-show="isAuthenticated">
              <v-icon
                :class="{ color: item.isBookmark }"
                @click="updateBookmarks(item, i)"
                >mdi-bookmark-multiple</v-icon
              >
            </span>
          </div>
        </v-card-actions>
        <v-divider></v-divider>
        <div
          :class="[
            'text-overline',
            'text-right',
            'mt-3',
            { 'on-click': isAuthenticated }
          ]"
        >
          <span @click="$emit('toProfile', item.authorId)">{{
            item.authorName
          }}</span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: this.itemList
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "bookmarks"])
  },
  props: {
    itemList: Array
  },
  mounted() {
    this.modifyBooks();
    if (this.isAuthenticated) {
      this.checkBookmark();
    }
  },
  methods: {
    //itemsの日付、写真のデータを修正
    modifyBooks() {
      this.items.forEach(item => {
        item.firstDate = this.setDate(item.firstDate);
        item.lastDate = this.setDate(item.lastDate);
        item.update = this.convertTimeStamp(item.update.toDate());
        if (!item.photo) {
          item.photo = require("@/assets/img/pastel_00019.jpg");
        }
      });
    },
    //ブックマークに登録されているか
    checkBookmark() {
      this.items.forEach(item => {
        this.$set(item, "isBookmark", false);
      });
      this.bookmarks.forEach(bookmark => {
        if (this.bookmarks.length !== 0) {
          this.items.forEach(item => {
            if (
              item.id === bookmark.id &&
              item.authorId === bookmark.authorId
            ) {
              item.isBookmark = true;
            }
          });
        }
      });
    },
    //ブックマークの登録・解除
    updateBookmarks(item, i) {
      this.items[i].isBookmark = !this.items[i].isBookmark;
      this.$emit("updateBookmarks", item);
    },
    //String型のdateデータをNumber型に変換
    setDate(v) {
      const dates = {
        year: Number(v.substr(0, 4)),
        month: Number(v.substr(5, 2)),
        date: Number(v.substr(8, 2))
      };
      const today = new Date();
      const thisYear = today.getFullYear();
      if (dates.year === thisYear) {
        return dates.month + "/" + dates.date;
      } else {
        return dates.year + "/" + dates.month + "/" + dates.date;
      }
    },
    //タイムスタンプをDate型に変換
    convertTimeStamp(date) {
      let formatted_date =
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      return formatted_date;
    }
  }
};
</script>

<style scoped>
.theme--light.v-icon.color {
  color: #ffab40;
}
</style>
