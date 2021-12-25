<template>
  <div>
    <v-btn @click="logout" elevation="0" block text class="py-8">ログアウト</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    //ログアウト処理
    logout () {
      this.$store.dispatch('logout')
      location.reload()
    }
  }
}
</script>
