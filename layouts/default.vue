<template>
  <v-app v-cloak class="hidden">
    <v-app-bar fixed flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="toTimeLine" class="on-click"
        >My HandBook</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <LoginParts v-show="!isAuthenticated"></LoginParts>
      <v-row v-show="isAuthenticated" class="py-5">
        <v-col cols="8">
          <h2 class="text-center">{{ user.name }}</h2>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <span class="on-click" @click="$router.push('/setting')"
            ><v-icon>mdi-cog</v-icon></span
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group>
          <v-list-item @click="$router.push('/timeline')" class="py-5">
            <v-icon class="mr-4">mdi-clock-outline</v-icon>
            <v-list-item-title>タイムライン</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(menu, i) in menuBar"
            :key="i"
            class="py-5"
            @click="$router.push(menu.url)"
            v-show="isAuthenticated"
          >
            <v-icon class="mr-4">mdi-{{ menu.icon }}</v-icon>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <LogoutParts v-show="isAuthenticated"></LogoutParts>
    </v-navigation-drawer>
    <Nuxt />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "default",
  data() {
    return {
      drawer: false,
      menuBar: [
        { title: "マイページ", url: "/mypage", icon: "format-list-bulleted" },
        { title: "プロフィール", url: "/profile", icon: "account-circle" },
        {
          title: "ブックマーク",
          url: "/bookmark",
          icon: "bookmark-multiple-outline"
        }
      ]
    };
  },
  beforeCreate() {},
  methods: {
    //タイムラインのページに遷移
    toTimeLine() {
      this.$router.push("/timeline");
    }
  },
  computed: {
    user() {
      if (this.$store.getters.user) {
        return this.$store.getters.user;
      } else {
        return "未登録";
      }
    },
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
