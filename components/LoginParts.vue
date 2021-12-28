<template>
  <div>
    <v-btn @click="login" block text class="py-8">ログイン</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push("/login");
    }
  }
};
</script>
