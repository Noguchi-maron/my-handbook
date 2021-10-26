<template>
  <v-app v-cloak>
    <v-app-bar absolute class="px-12" flat>
      <v-toolbar-title>My HandBook</v-toolbar-title>
      <v-spacer></v-spacer>
      <LoginParts v-show="!$store.state.loginStatus"></LoginParts>
      <LogoutParts v-show="$store.state.loginStatus"></LogoutParts>
    </v-app-bar>

    <Nuxt />
  </v-app>
</template>

<script>
export default {
  async mounted () {
    this.$store.dispatch('loadLogin')
  }
}
</script>
