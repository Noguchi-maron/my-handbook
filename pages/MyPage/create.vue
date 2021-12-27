<template>
  <v-row justify="center" align="center" v-resize="resizeWindow">
    <v-col cols="11" md="8">

      <v-card class="py-10" outlined>
        <v-form>
        <v-row>
          <v-col cols="11" md="8" class="mx-auto">
        <v-card-title>新しいしおり</v-card-title>
        <v-text-field label="しおりの名前" counter maxlength="25" v-model="form.title"></v-text-field>
        <v-file-input label="File input"  prepend-icon="mdi-camera"  accept=".png, .jpeg, .jpg" @change="inputPhoto"></v-file-input>
        <v-row dense>
          <v-col cols="7">
            <v-select multiple v-model="form.selectPref" :items="prefectures" label="エリア選択"></v-select>
          </v-col>
        </v-row>
        <v-row dense class="align-center"> 
        <v-col cols="12" sm="5">
          <v-menu ref="menu" v-model="firstDateMenu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.firstDate"
              label="初日"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              hide-details="none"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.firstDate"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="firstDateMenu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(form.firstDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
            </v-col>
            <v-col cols="2">
          <div v-show="windowWidth >= 600" class="text-center">～</div>
            </v-col>
            <v-col cols="12" sm="5">
              <v-menu ref="menu" v-model="lastDateMenu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.lastDate"
              label="最終日"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              hide-details="none"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.lastDate"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="lastDateMenu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(form.lastDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
            </v-col>

        </v-row>
        <v-textarea v-model="form.exp" label="説明" counter maxlength="200" auto-grow rows="3" ></v-textarea>
        <v-row dense class="justify-end mt-4">
        <v-btn elevation="0" color="primary" @click.prevent="submit" :disabled="canSubmit">新規作成</v-btn>
        </v-row>
          </v-col>
        </v-row>
        </v-form>
      </v-card>
    </v-col>
    
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      form: {
        authorName: '',
        authorId: '',
        id: '',
        title: '',
        photo: '',
        created: '',
        firstDate: '',
        lastDate: '',
        exp: '',
        update: '',
        selectPref: []
      },
      firstDateMenu: false,
      lastDateMenu: false,
      date: '',
      image: null,
      prefectures: ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県', '海外'],
      selectPref: [],
      windowWidth: 400,
    }
  },
  methods: {
    //入力内容の送信・保存
    async submit () {
      if(!this.form.title || this.form.title.length > 25 || this.form.exp.length > 200 || !this.form.firstDate || !this.form.selectPref) {
        return
      }
      this.form.photo = this.image
      this.form.photo = this.url
      const user = this.$store.state.user
      const collection = this.$fb.firestore().collection('users').doc(user.id).collection('books')
      this.form.authorName = user.name
      this.form.authorId = user.id
      const newDoc = collection.doc().id
      this.form.id = newDoc
      this.form.created = this.$fb.firestore.FieldValue.serverTimestamp()
      this.form.update = this.form.created
      await collection.doc(newDoc).set({ ...this.form })
      this.$router.push('/mypage')
    },
    //ウィンドウサイズの変更を検知
    resizeWindow () {
      this.windowWidth = window.innerWidth
    },
    inputPhoto (image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.image = e.target.result
      }
    }
  },
  computed: {
    canSubmit () {
      if (!this.form.title || this.form.title.length > 25 || this.form.exp.length > 200 || !this.form.firstDate || this.form.selectPref.length === 0) {
        return true
      } else {
        false
      }
    }
  }
}
</script>

<style scoped>
.card-with-border {
  border-style: solid; 
  border-width: 2px; 
  border-color: red; 
  }
</style>
