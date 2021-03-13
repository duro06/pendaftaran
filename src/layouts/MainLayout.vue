<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          Madrasah ...
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-lime-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <div class="bg-green-2 q-pa-md">
            <strong>Menu</strong> 
          </div>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

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
          <q-fab-action external-label label-position="left" color="amber" to="/daftar" icon="fas fa-user-plus" label="Register" padding="11px"/>
          <q-fab-action external-label label-position="left" color="blue" to="/diskusi" icon="fas fa-comment" label="Diskusi" padding="11px"/>
          <q-fab-action external-label label-position="left" color="blue" to="/login" icon="fas fa-user-alt" label="Login"  padding="11px"/>
          <q-fab-action external-label label-position="left" color="secondary" to="/pendaftaran" icon="fas fa-table" label="Informasi pendaftaran" padding="11px"/>
          <q-fab-action external-label label-position="left" color="primary" to="/" icon="fas fa-home" label="Beranda"  padding="11px"/>
        </q-fab>
      <!-- </q-page-sticky> -->
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

// const linksData = [
//   {
//     title: 'Home',
//     caption: 'Halaman Depan',
//     icon: 'home',
//     link: '/'
//   },
//   {
//     title: 'Pendaftaran',
//     caption: 'Pendaftaran siswa baru',
//     icon: 'fas fa-table',
//     link: '/pendaftaran'
//   },
//   {
//     title: 'Login',
//     caption: 'halaman Login',
//     icon: 'fas fa-user-alt',
//     link: '/login'
//   },
//   {
//     title: 'Daftar',
//     caption: 'Daftar sebagai user baru',
//     icon: 'fas fa-user-plus',
//     link: '/login'
//   },
// ];

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      fab: true,
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
