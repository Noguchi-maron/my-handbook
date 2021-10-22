<template>
  <div>
    <v-btn @click="logout" elevation="0">ログアウト</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$fb.auth().signOut().then(() => {
        this.$store.dispatch('loadLogin')
        this.$router.push('/')
      })
    }
  }
}
</script>
