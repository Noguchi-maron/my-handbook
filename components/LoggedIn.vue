<template>
  <div>
    <v-row justify="center" class="mt-10">
      <v-btn color="primary" @click="toMypage">マイページへ</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    toMypage() {
      this.$router.push("/mypage");
    }
  }
};
</script>
