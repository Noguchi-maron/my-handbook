<template>
  <div class="wrap">
    <v-row justify="center">
      <v-col md="6">
        <h1 class="py-10 text-center">My Handbook</h1>
        <LoggedIn v-if="$store.state.loginStatus"></LoggedIn>
        <SignUp v-if="!$store.state.loginStatus"></SignUp>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    
  }
}
</script>
