<template>
  <div class="wrap">
    <h3>尼崎旅行</h3>
    <v-row>
      <v-col md="6" class="pr-4">
        <v-row>
          <v-col>
            <v-card flat>
              <GmapMap map-type-id="roadmap" :center="maplocation" :zoom="zoom" :style="styleMap" :options="mapOptions">
                <GmapMarker v-for="dest in dests" :key="dest.order" :title="dest.name" :position="dest.position" />
                <GmapPolyline></GmapPolyline>  
              </GmapMap>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="6" class="pl-4">
          <v-card flat class="mt-4">
            <v-row justify="end">
              <v-btn text color="primary">目的地追加</v-btn>
              <v-btn text color="error">編集</v-btn>
            </v-row>
            <v-virtual-scroll>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="dest in dests" :key="dest.order" @mouseover="mouseOverList(dest)" @mouseleave="mouseLeaveList(dest)">
                    <v-list-item-title class="mr-4">{{ dest.order }}. 　{{ dest.name }}</v-list-item-title>
                    <v-list-item-subtitle class="address">{{ dest.address }}</v-list-item-subtitle>
                    <v-btn elevation="0" color="primary" text>ルートを表示</v-btn>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-virtual-scroll>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
      path: [],
    }
  },
  methods: {
    mouseOverList (dest) {
      dest.hoverBtn = true
    },
    mouseLeaveList (dest) {
      dest.hoverBtn = false
    },
  },
  computed: {
    routePath () {
      const path = []
      this.dests.forEach(d => {
        path.push(d.position)
      })
      return path
    },
    
  },
  async mounted () {
  }
}
</script>

