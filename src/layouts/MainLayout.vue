<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered v-show="!noHeader" :class="[!main ? bgHeader : bgWhite]">
      <q-toolbar>
        <q-btn
          v-show="!main"
          v-go-back="$route.meta.backto ? { name: $route.meta.backto } : '/'"
          flat
          round
          icon="eva-arrow-back-outline"
          dense
        />
        <q-toolbar-title>
          <div class="f-14">{{ $route.meta.title }}</div>
        </q-toolbar-title>
        <!-- <q-btn dense round flat icon="eva-bell-outline" @click="toNotif">
          <q-badge color="secondary" floating transparent v-show="notifs > 0">
            {{ notifs }}
          </q-badge>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white">
      <q-tabs
        active-color="primary"
        indicator-color="primary"
        class="text-grey-10"
      >
        <q-route-tab to="/" name="home" icon="eva-home-outline" no-caps>
          <div class="text-grey f-10">Beranda</div>
        </q-route-tab>
        <q-route-tab
          :to="{ name: 'pendaftaran' }"
          name="pendaftaran"
          icon="app_registration"
          no-caps
        >
          <div class="text-grey f-10">Pendaftaran</div>
        </q-route-tab>
        <q-route-tab
          :to="{ name: 'diskusi' }"
          name="forum"
          icon="eva-cast-outline"
          no-caps
        >
          <div class="text-grey f-10">Forum</div>
        </q-route-tab>
        <q-route-tab
          to="/profile"
          name="profile"
          icon="eva-person-outline"
          no-caps
        >
          <div class="text-grey f-10">Profile</div>
        </q-route-tab>
      </q-tabs>
    </q-footer>
    <!-- button for admin at Pendaftaran page -->
    <div
      class="fixed-bottom-left q-ma-sm q-mb-xl q-mb-lg front"
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
import { mapGetters } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      fab: false,
      fabAdmin: false,
      bgHeader: "bg-primary text-white",
      bgWhite: "bg-white text-grey-10",
      popupNotif: false,
    };
  },
  computed: {
    ...mapGetters("users", ["loggedIn"]),

    // jmlNotif() {
    //   return this.notifications.length;
    // },
    main() {
      return this.$route.path === "/";
    },
    noHeader() {
      return (
        this.$route.path === "/profile" || this.$route.path === "/profile/"
      );
    },
  },
  methods: {
    onClick() {
      console.log("Clicked on a fab action");
    },
    fabAction() {
      console.log("fab clicked");
    },
  },
};
</script>
<style scoped>
.front {
  z-index: 9998 !important;
}
#admin-button {
  z-index: 9998;
}
</style>
