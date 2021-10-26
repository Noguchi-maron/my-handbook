<template>
  <div class="wrap">
    <h3>尼崎旅行</h3>
    <v-row>
      <v-col md="6" class="pr-4">
        <v-row>
          <v-col>
            <v-card flat>
              <GmapMap map-type-id="roadmap" :center="maplocation" :zoom="zoom" :style="styleMap" :options="mapOptions" ref="map">
                <GmapMarker v-for="dest in dests" :key="dest.order" :title="dest.name" :position="dest.position" />
                <GmapPolyline :path="path"></GmapPolyline>  
              </GmapMap>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="6" class="pl-4">
          <v-card flat class="mt-4">
            <v-row justify="end">
              <v-btn text color="primary" @click="toSearch" :disabled="isEdit">目的地追加</v-btn>
              <v-btn text color="error" @click="editBtn" v-show="!isEdit">編集</v-btn>
              <v-btn text color="error" @click="editDone" v-show="isEdit">完了</v-btn>
            </v-row>
              <v-list>
                <v-list-item-group>
                  <draggable v-model="dests" handle=".item-handle">
                  <v-list-item v-for="dest in dests" :key="dest.order">
                    <v-icon color="#c0c0c0" v-show="isEdit" class="item-handle">mdi-drag-horizontal-variant</v-icon>
                    <v-list-item-title class="mr-4"><span v-show="!isEdit">{{ dest.order }}.</span> 　{{ dest.name }}</v-list-item-title>
                    <v-list-item-subtitle class="address">{{ dest.address }}</v-list-item-subtitle>
                    <v-btn elevation="0" color="primary" text @click="getRoute" v-show="!isEdit">ルートを表示</v-btn>
                    <v-btn color="error" text v-show="isEdit" @click="deleteBtn(dest)">削除</v-btn>
                  </v-list-item>
                  </draggable>
                </v-list-item-group>
              </v-list>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      dests: [
        {
          name: 'あまがさき観光案内所',
          address: '兵庫県尼崎市神田中通1-4',
          position: { lat: 34.71949830333075, lng: 135.41775235104012 },
          order: 1,
          hoverBtn: true
        },
        {
          name: '尼崎城',
          address: '兵庫県尼崎市北城内27番地',
          position: { lat: 34.71682008223184, lng: 135.41884881294817 },
          order: 2,
          hoverBtn: false,
        },
        
      ],
      maplocation: { lat: 34.71682008223184, lng: 135.41884881294817 },
      zoom: 14,
      styleMap: {
        width: '100%',
        height: '500px'
      },
      mapOptions: {
        streetViewControl: false,
        styles: []
      },
      isEdit: false,
    }
  },
  methods: {
    
  },
  computed: {
    path () {
      const path = []
      this.dests.forEach(d => {
        path.push(d.position)
      })
      return path
    },
    destsCollection () {
      return this.$fb.firestore().collection('users').doc(this.user.id).collection('books').doc(this.$route.params.bookId).collection('dests')
    },
    ...mapGetters(['usersCollection', 'booksCollection']),
    ...mapState(['user'])
  },
  async mounted () {
    const dests = await this.destsCollection.orderBy('order').get()
    this.dests = dests.docs.map(d => d.data())
    this.$store.dispatch('getDestsLength', this.dests.length)
  },
  methods: {
    async getRoute () {
      const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json?'
      const origin = `origin=東京駅&`
      const dest = `destination=スカイツリー&`
      const api = 'key=AIzaSyBh-_M4bK4QLagtvjwzRy9-Eoi5MpP9IXo'
      const getUrl = baseUrl + origin + dest + api
      this.pathes = await this.$axios.$get(getUrl)
    },
    toSearch() {
      this.$router.push(`/mypage/${this.$route.params.bookId}/search`)
    },
    editBtn () {
      this.isEdit = true
    },
    async editDone () {
      this.dests.forEach((d, i) => {
        d.order = ++i
      })
      await this.booksCollection.update(this.dests)
      this.isEdit = false
    },
    deleteBtn (dest) {
      
    },
    ...mapActions(['getDestsLength'])
  }
}
</script>

