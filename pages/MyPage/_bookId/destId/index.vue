<template>
  <div class="wrap">
    <v-row justify="center">
      <v-col md="8">
        <v-card >
          <v-row justify="center">
            <v-col md="8">
              <v-text-field v-model="item.name" readonly></v-text-field>
              <v-text-field v-model="item.formatted_address" readonly></v-text-field>
              <v-text-field v-model="item.formatted_phone_number" readonly></v-text-field>
              <v-textarea v-model="item.exp"></v-textarea>
              <v-row>
                <v-btn elevation="0">保存</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {}
    }
  },
  async mounted () {
    const collection = this.$fb.firestore.collection('users').doc(this.$store.state.user.id).collection('books').doc(this.$route.params.bookId).collection('dests')
    
  },
  methods: {

  }
}
</script>
