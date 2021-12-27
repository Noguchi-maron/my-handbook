<template>
  <v-row
    justify="center"
    class="page-wrap"
    align="center"
    v-resize="resizeWindow"
  >
    <v-col cols="11" md="10">
      <v-row class="align-center">
        <h3 class="d-inline-block">{{ bookData.title }}</h3>
        <v-icon class="ml-4 on-click" @click="toEditBook" v-if="!authorId"
          >mdi-pencil</v-icon
        >
      </v-row>
      <v-row justify="space-between">
        <v-col cols="12" sm="6" class="pr-4">
          <div v-if="!mapActive" :style="{ height: mapHeight + 'px' }"></div>
          <MapParts
            :destLists="dests"
            v-if="mapActive"
            @clickMarker="openInfo"
          ></MapParts>
        </v-col>
        <v-col cols="12" sm="6" class="pl-4">
          <v-sheet>
            <v-chip-group
              v-model="selectDate"
              @change="getDests"
              mandatory
              active-class="primary--text"
              next-icon="mdi-chevron-right"
              :show-arrows="isIconShow"
            >
              <v-chip v-for="date in dates" :key="date">{{ date }}日目</v-chip>
            </v-chip-group>
          </v-sheet>
          <v-card outlined :style="{ height: destHeight + 'px' }">
            <v-row justify="end" class="mt-3 mr-4" v-if="!authorId">
              <v-btn text color="primary" @click="toSearch" :disabled="isEdit"
                >目的地追加</v-btn
              >
              <v-btn text color="error" @click="editBtn" v-show="!isEdit"
                >編集</v-btn
              >
              <v-btn text color="error" @click="editDone" v-show="isEdit"
                >完了</v-btn
              >
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-card
                  :class="['scroll', { isButton: !authorId }]"
                  flat
                  :style="{ height: listHeight + 'px' }"
                >
                  <v-list>
                    <v-list-item-group>
                      <draggable v-model="dests" handle=".item-handle">
                        <v-list-item
                          v-for="(dest, i) in dests"
                          :key="dest.order"
                          @click="openInfo(i)"
                        >
                          <v-icon
                            color="#c0c0c0"
                            v-show="isEdit"
                            class="item-handle"
                            >mdi-drag-horizontal-variant</v-icon
                          >
                          <v-list-item-title class="mr-4"
                            ><span v-show="!isEdit">{{ i + 1 }}.</span>
                            {{ dest.name }}</v-list-item-title
                          >
                          <v-list-item-subtitle
                            class="address"
                            v-show="isShowAddress"
                            >{{ dest.address }}</v-list-item-subtitle
                          >
                          <v-btn
                            color="primary"
                            text
                            @click="editDestsBtn(dest.id)"
                            >詳細</v-btn
                          >
                          <v-btn
                            color="error"
                            text
                            v-show="isEdit"
                            @click="deleteBtn(dest.id, i)"
                            >削除</v-btn
                          >
                        </v-list-item>
                      </draggable>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    authorId: String,
    bookId: String,
    pageName: String,
  },
  data() {
    return {
      dests: [],
      isEdit: false,
      book: null,
      bookData: {},
      dates: [],
      selectDate: 0,
      userId: this.authorId,
      mapActive: false,
      mapHeight: 500,
      destHeight: 450,
      isIconShow: false,
      isShowAddress: true,
      listHeight: 400
    };
  },
  watch: {
    selectDate() {
      this.getDests;
    }
  },
  computed: {
    firstDate() {
      if (!this.$route.query.date) {
        return 0;
      } else {
        returnthis.$route.query.date;
      }
    }
  },
  mounted() {
    if (!this.authorId) {
      this.userId = this.$store.getters.userId;
    }

    this.book = this.$fb
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("books")
      .doc(this.bookId);
    this.getBookData();
  },

  methods: {
    //しおりをfirestoreから取得
    async getBookData() {
      const d = await this.book.get();
      if (d.exists) {
        this.bookData = d.data();
        this.getDates();
        this.getDests();
      }
    },
    //目的地をfirestoreから取得
    async getDests() {
      this.mapActive = false;

      const selectDate = this.selectDate + 1;
      await this.book
        .collection(`dests`)
        .where("date", "==", selectDate)
        .orderBy("order")
        .get()
        .then(destData => {
          if (destData) {
            this.dests = destData.docs.map(d => d.data());
            this.dests.forEach(dest => {
              this.$set(dest, "window_open", false);
            });
            this.mapActive = true;
          } else {
            this.dests = [];
            this.mapActive = true;
          }
        });
    },
    //infoを開く処理
    openInfo(i) {
      this.dests.forEach(dest => (dest.window_open = false));
      this.dests[i].window_open = true;
    },
    //目的地の登録画面への遷移
    async toSearch() {
      const date = this.$fb.firestore.FieldValue.serverTimestamp();
      this.book.update({ update: date });
      this.$router.push(
        `/mypage/${this.bookId}/search?date=${this.selectDate}&order=${this.dests.length}`
      );
    },
    //しおりの編集画面
    toEditBook() {
      this.$router.push(`/mypage/${this.bookId}/edit`);
    },
    //目的地の編集の切り替え
    editBtn() {
      this.isEdit = true;
    },
    //編集内容を保存
    editDone() {
      this.dests.forEach((d, i) => {
        const newOrder = ++i;
        if (d.order !== newOrder) {
          this.setOrder(newOrder, d.id, i);
        }
      });
      this.isEdit = false;
    },
    //目的地の順番を保存
    async setOrder(newOrder, id) {
      await this.book
        .collection("dests")
        .doc(id)
        .update({ order: newOrder });
    },
    //目的地の削除
    async deleteBtn(id, i) {
      await this.book
        .collection("dests")
        .doc(id)
        .delete();
      this.dests.splice(i, 1);
    },
    //String型のdateデータをNumber型に変換
    setDate(v) {
      const dates = {
        year: Number(v.substr(0, 4)),
        month: Number(v.substr(5, 2)),
        date: Number(v.substr(8, 2))
      };
      return dates;
    },
    //日付の差分を求める処理
    getDates() {
      const date1Data = this.setDate(this.bookData.firstDate);
      const date2Data = this.setDate(this.bookData.lastDate);
      const date1 = new Date(
        date1Data.year,
        date1Data.month - 1,
        date1Data.date
      );
      const date2 = new Date(
        date2Data.year,
        date2Data.month - 1,
        date2Data.date
      );
      const termDay = (date2 - date1) / 86400000;
      for (let i = 1; i <= termDay + 1; i++) {
        this.dates.push(i);
      }
    },
    //目的地の情報を編集
    editDestsBtn(id) {
      if (!this.authorId) {
        this.$router.push(`/mypage/${this.bookId}/${id}?date=${this.selectDate}`);
      } else {
        this.$router.push(`/${this.pageName}/${this.authorId}/${this.bookId}/${id}?date=${this.selectDate}`);
      }
    },
    //ウィンドウサイズを検知する処理
    resizeWindow() {
      if (window.innerWidth < 600) {
        const navHeight = 56;
        const titleHeight = 50;
        const chipHeight = 50;
        this.mapHeight = Math.floor((window.innerHeight - navHeight) / 3);
        this.destHeight = this.mapHeight * 2 - chipHeight - titleHeight - 50;
      } else {
        this.destHeight = 450;
      }
      if (window.innerWidth < 400) {
        this.isIconShow = false;
        this.isShowAddress = false;
      } else {
        this.isIconShow = true;
        this.isShowAddress = true;
      }
      if (!this.authorId) {
        this.listHeight = this.destHeight - 60;
      } else {
        this.listHeight = this.destHeight - 10;
      }
    }
  }
};
</script>

<style scoped>
.v-list.v-sheet.theme--light {
  padding: 0;
}
.isButton.scroll.v-card.v-sheet.theme--light {
  margin-top: 10px;
}
</style>
