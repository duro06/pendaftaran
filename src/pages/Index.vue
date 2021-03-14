<template>
  <q-page class="flex flex-center">
    <div class="q-ma-sm">
      <div class="row justify-evenly">
        
        <div class="col q-ma-xs" @click="routing">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">

            <q-card-section>
              <div class="text-h6">Judul</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Some hint of the news
            </q-card-section>
          </q-card>
        </div>

        <div class="col q-ma-xs">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">

            <q-card-section>
              <div class="text-h6">Judul</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Some hint of the news
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{

    }
  },
  methods:{
    routing(){
      this.$router.push({name:'berita'})
    }
  }
  
}
</script>
