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
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="{ name: nav.to }"
          :name="nav.name"
          :icon="nav.icon"
          no-caps
        >
          <div class="text-grey f-10">{{ nav.label }}</div>
        </q-route-tab>
      </q-tabs>
    </q-footer>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="777"
      class="bg-grey-2"
    >
      <!-- height: calc(100% - 200px); -->
      <q-scroll-area
        class="fit"
        style="margin-top: 100px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="{ name: nav.to }"
            exact
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>

            <q-item-section>
              {{ nav.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
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
import { ref } from "vue";
export default {
  name: "MainLayout",
  data() {
    return {
      drawer: false,
      miniState: true,
      fab: false,
      fabAdmin: false,
      bgHeader: "bg-primary text-white",
      bgWhite: "bg-white text-grey-10",
      popupNotif: false,
      leftDrawerOpen: false,
      navs: [
        {
          to: "index",
          icon: "home",
          label: "Beranda",
          name: "Home",
        },
        {
          to: "pendaftaran",
          icon: "app_registration",
          label: "Pendaftaran",
          name: "Pendaftaran",
        },
        {
          to: "diskusi",
          icon: "eva-cast-outline",
          label: "Forum",
          name: "Forum",
        },
        {
          to: "profile",
          icon: "eva-person-outline",
          label: "Profile",
          name: "Profile",
        },
      ],
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
<style lang='scss' scoped>
@media screen and (min-width: 761px) {
  .q-footer {
    display: none;
  }
}
.header-image {
  height: 100%;
  // width: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
.front {
  z-index: 9998 !important;
}
#admin-button {
  z-index: 9998;
}
</style>
