<template>
  <div>
    <v-btn @click="login">ログイン</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/login')
    }
  }
}
</script>
