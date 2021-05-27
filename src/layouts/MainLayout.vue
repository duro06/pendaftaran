<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Madrasah ...
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

<!-- floating action for navigation purpose -->

        <q-fab
          
          class="fixed-bottom-right q-mb-sm q-mr-sm"
          v-model="fab"
          vertical-actions-align="right"
          color="primary"
          glossy
          icon="keyboard_arrow_up"
          direction="up"
        >

          <q-fab-action external-label label-position="left" color="amber" :to="{name:'daftar'}" icon="fas fa-user-plus" label="Register" padding="11px"/>
          <q-fab-action external-label label-position="left" color="blue" :to="{name:'diskusi'}" icon="fas fa-comment" label="Diskusi" padding="11px"/>
          <q-fab-action external-label label-position="left" color="blue" :to="{name:'login'}" icon="fas fa-user-alt" label="Login"  padding="11px"/>
          <q-fab-action external-label label-position="left" color="secondary" :to="{name:'pendaftaran'}" icon="fas fa-table" label="Informasi pendaftaran" padding="11px"/>
          <q-fab-action external-label label-position="left" color="primary" to="/" icon="fas fa-home" label="Beranda"  padding="11px"/>
        </q-fab>
        
    <!-- 
      button for admin at home page 
      $route.path.includes('/') is not working due to lack of uniqueness
      it will appear everywhere
    -->
    
    <!-- button for admin at Pendaftaran page -->
    <div 
      class="fixed-bottom-left q-ma-sm front"
      id="admin-button"
      v-if="$route.path.includes('/pendaftaran')"
      exact
    >        
      <q-btn push color="accent" round icon="add" />
    </div>
    <!-- ----------------------------- -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      fab: false,
      fabAdmin:false
    }
  },
  computed:{},
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
<style scoped>
.front{
  z-index: 9998 !important;
}
#admin-button{
  z-index: 9998;
}
</style>
