<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          User
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

<!-- floating action -->


      <!-- <q-page-sticky position="bottom-right" :offset="fabPos"> -->
            <!-- <q-btn fab icon="add" color="accent" /> -->
        <q-fab
          
          class="absolute-bottom-right q-mb-sm q-mr-sm"
          v-model="fab"
          vertical-actions-align="right"
          color="primary"
          glossy
          icon="keyboard_arrow_up"
          direction="up"
        >
          <!-- :disable="draggingFab"
          v-touch-pan.prevent.mouse="moveFab" 
          v-touch-pan.maouse="moveFab" -->          
          <q-fab-action external-label label-position="left" color="amber" :to="{name:'daftar'}" icon="fas fa-user-plus" label="Register" padding="11px"/>
          <q-fab-action external-label label-position="left" color="blue" :to="{name:'login'}" icon="fas fa-user-alt" label="Login"  padding="11px"/>
          <q-fab-action external-label label-position="left" color="primary" to="/" icon="fas fa-home" label="Beranda"  padding="11px"/>
        </q-fab>
      <!-- </q-page-sticky> -->
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Account',
  // components: { EssentialLink },
  data () {
    return {
      fab: false,
      // leftDrawerOpen: false,
      // essentialLinks: linksData
    }
  },
    methods: {
    
    onClick () {
      console.log('Clicked on a fab action')
    },
    fabAction(){
      console.log('fab clicked');
    }
  }
}
</script>
