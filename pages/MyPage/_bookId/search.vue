<template>
  <div class="wrap">
    <v-row>
      <v-col cols="8" class="mx-auto">
    <v-form>
      <v-container>
    <v-row align="center">
      <v-col cols="12" sm="6" md="4">
        
        <GmapAutocomplete @place_changed="getResult"></GmapAutocomplete>
      </v-col>
    </v-row>
      </v-container>
    </v-form>

    <v-card flat>
      
      <v-text-field outlined readonly v-model="result.name" label="施設・場所の名前"></v-text-field>
      <v-text-field outlined readonly v-model="result.formatted_address" label="住所"></v-text-field>
      <v-row>
        <v-col cols="6">
      <v-text-field outlined readonly v-model="result.formatted_phone_number" label="電話番号"></v-text-field>
        </v-col>
      </v-row>
      <v-text-field outlined readonly v-model="result.website" label="ウェブサイト"></v-text-field>
      <v-textarea rows="3" label="メモ" v-model="exp"></v-textarea>
      <v-row dense class="justify-end mt-4 mr-5">
      <v-btn color="primary" @click="submit">保存</v-btn>
      </v-row>
    </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { debounce } from 'lodash'
export default {
  data () {
    return {
      waiting: false,
      items: [],
      result: {},
      readOnly: false,
      exp: '',
    }
  },
  watch: {
      
  },
  computed: {
    
  },
  methods: {
    getResult: debounce(function (v) {
      console.log(v)
      this.result = {
        name: v.name,
        id: '',
        formatted_address: v.formatted_address,
        formatted_phone_number: v.formatted_phone_number,
        website : v.website,
        exp : '営業時間：　' + v.opening_hours.weekday_text,
        created: '',
      }
    }, 1000),
    async submit () {
      const userId = this.$store.state.user.id
      const collection = this.$fb.firestore().collection('users').doc(userId).collection('books').doc(this.$route.params.bookId).collection('dests')
      const newDoc = collection.doc().id
      this.result.id = newDoc
      this.result.created = this.$fb.firestore.FieldValue.serverTimestamp()
      await collection.doc().push({ ...this.result })
      this.$router.push(`/mypage/${this.$route.params.bookId}`)
    }
  },
  
}
</script>