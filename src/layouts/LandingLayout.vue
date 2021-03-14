<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="fas fa-arrow-left"
          aria-label="Menu"
          @click="back"
        />
        <q-toolbar-title>
          back
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Landing',
  // components: { EssentialLink },
  data () {
    return {
    }
  },
    methods:{
      back(){
        this.$router.push({name:'index'})
      }
  }
}
</script>
