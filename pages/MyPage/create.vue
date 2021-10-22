<template>
  <div class="wrap">
  <v-row>
    <v-col cols="8" class="mx-auto">
      <v-card class="py-10">
        <v-form>
        <v-row>
          <v-col cols="8" class="mx-auto">
        <v-card-title>新しいしおり</v-card-title>
        <v-text-field label="しおりの名前" counter maxlength="25" v-model="form.title"></v-text-field>
        <v-row dense class="align-center"> 
        <v-col cols="5">
              <v-menu ref="menu" v-model="firstDateMenu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.firstDate"
              label="日程初日"
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
          <div class="text-center">～</div>
            </v-col>
            <v-col cols="5">
              <v-menu ref="menu" v-model="lastDateMenu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.lastDate"
              label="日程初日"
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
        <v-btn elevation="0" color="primary" @click.prevent="submit">新規作成</v-btn>
        </v-row>
          </v-col>
        </v-row>
        </v-form>
      </v-card>
    </v-col>
    
  </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: '',
        title: '',
        created: '',
        firstDate: '',
        lastDate: '',
        exp: '',
        update: ''
      },
      firstDateMenu: false,
      lastDateMenu: false,
      date: '',
    }
  },
  methods: {
    async submit () {
      console.log(this.form)
      if(!this.form.title || this.form.title.length > 25 || this.form.exp.length > 200) {
        return
      }
      const userId = this.$store.state.user.id
      const collection = this.$fb.firestore().collection('users').doc(userId).collection('books')
      const newDoc = collection.doc().id
      this.form.id = newDoc
      this.form.created = this.$fb.firestore.FieldValue.serverTimestamp()
      this.form.update = this.form.created
      await collection.doc(newDoc).set({ ...this.form })
      this.$router.push('/mypage')
    }
  }
}
</script>
