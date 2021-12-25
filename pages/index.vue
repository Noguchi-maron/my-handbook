<template>
<v-row justify="center" class="page-wrap">
    <v-col cols="11" sm="8">
  <div>
    <v-row justify="center">
      <v-col md="6">
        <h1 class="py-7 text-center">My Handbook</h1>
        <LoggedIn v-if="$store.getters.isAuthenticated"></LoggedIn>
        <SignUp v-if="!$store.getters.isAuthenticated"></SignUp>
      </v-col>
    </v-row>
  </div>
      </v-col>
      </v-row>
</template>

<script>

