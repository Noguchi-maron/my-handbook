<template>
  <v-row v-resize="resizeWindow">
          <v-col>
            <v-card flat>
              <GmapMap map-type-id="roadmap" :center="maplocation" :zoom="zoom" :style="styleMap" :options="mapOptions" ref="gmap">
                <GmapInfoWindow v-for="dest in dests" :key="`first-${dest.order}`"
        @closeclick="dest.window_open=false" 
        :opened="dest.window_open" 
        :position="dest.position"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
    >{{ dest.order }}.{{ dest.name }}</GmapInfoWindow>
      <GmapMarker v-for="(dest, index) in dests" :key="`second-${dest.order}`" :title="dest.name" :position="dest.position" @click="$emit('clickMarker', index)"/>
              <GmapPolyline :path="path" :options="{ strokeColor:'#1A73E8'}"></GmapPolyline>  
              </GmapMap>
            </v-card>
          </v-col>
        </v-row>
</template>

<script>
export default {
  props: {
    destLists: Array,
  },
  computed: {
    path () {
      const path = []
      this.dests.forEach(d => {
        path.push(d.position)
      })
      return path
    },
    dests () {
      return this.destLists
    }
  },
  data () {
    return {
      maplocation: { lat: 0, lng: 0 },
      zoom: 14,
      styleMap: {
        width: '100%',
        height: '500px'
      },
      mapOptions: {
        streetViewControl: false,
        styles: []
      },
      windowSize: {h: 0, w: 0},
    }
  },
  mounted (){
    if (this.dests.length != 0) {
      this.setMaplocation()
    }
  },
  methods: {
    setMaplocation () {
      let sumLat = 0
        let sumLng = 0
        this.dests.forEach(d => {
          sumLat += d.position.lat
          sumLng += d.position.lng
        })
        const position = {
          lat: sumLat / this.dests.length,
          lng: sumLng / this.dests.length,
        }
        this.maplocation = position
        this.setZoom()
    },
    setZoom () {
      this.$gmapApiPromiseLazy().then(() => {
        if (this.dests.length > 2) {
          let bounds = new google.maps.LatLngBounds()
          for (let d of this.dests) {
            bounds.extend(d.position)
          }
          this.$refs.gmap.fitBounds(bounds)
        }
      })
    },
    resizeWindow () {
      if (window.innerWidth < 600) {
        const height = String(Math.floor((window.innerHeight - 56) / 3)) 
        this.styleMap.height = height + 'px'
      } else {
        this.styleMap.height = '500px'
      }
    }
  }
}
</script>
