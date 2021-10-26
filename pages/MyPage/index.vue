<template>
  <div class="wrap">
    <v-btn elevation="0" color="primary" @click="$router.push('/Mypage/create')">新規作成</v-btn>
      <div class="py-5">
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="item in items" :key="item.id">
    <v-card outlined  class="px-5 pt-3 pb-5">
      <div class="text-overline text-right">更新日：</div>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>
        {{ item.firstDate }}~{{ item.lastDate }}
      </v-card-text>
      <v-card-actions>
      <v-btn elevation="0" color="primary" @click="toBookId(item.id)">開く</v-btn>
      </v-card-actions>
    </v-card>
      </v-col>
    </v-row>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: '尼崎旅行',
          id: 'kwjfowierupqovbw',
          firstDate: '2021/9/1',
          lastDate: '2021/9/3',
          created: '2021/8/20',
          update: '2021/8/26'
        },
      ],
    }
  },
  filters: {
    

  },
  computed: {
    newUpdate () {
      return this.items.update.toDate()
    }
  },
  async mounted () {
    const userId = this.$store.state.user.id
    const books = await this.$fb.firestore().collection('users').doc(userId).collection('books').orderBy('created').get()
      this.items = books.docs.map(d => d.data())
  },
  methods: {
    toBookId (id) {
      this.$router.push(`/mypage/${id}`)
    }
  } 
  
}
</script>
