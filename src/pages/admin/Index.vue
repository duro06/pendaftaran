<template>
  <q-page>
    <HeaderProfile :isLogin="loggedIn" :adaFoto="adaFoto" />
    <!-- ini pagenya -->
    <!-- jika tidak login -->
    <div v-if="!loggedIn">
      <NoLogin />
    </div>
    <!-- jika sdh login -->
    <div v-else>
      <!-- Edit Profile -->
      <q-list bordered>
        <div v-for="item in items" :key="item.label">
          <q-separator />
          <q-item clickable v-ripple :to="{ name: item.to }">
            <q-item-section avatar>
              <div class="row">
                <q-icon :name="item.name" size="25px" />
                <span class="q-ml-sm q-mt-xs f-13">{{ item.label }}</span>
              </div>
            </q-item-section>
            <q-item-section>
              <q-item-label caption></q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row">
                <span class="q-ml-sm q-mt-xs f-13"></span>
                <q-icon
                  name="eva-arrow-ios-forward-outline q-mt-xs"
                  size="18px"
                />
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    HeaderProfile: () => import("src/pages/profile/HeaderProfile"),
    NoLogin: () => import("components/shared/NoLogin"),
  },
  data() {
    return {
      isLogin: true,
      adaFoto: false,
      items: [
        {
          to: "nilai",
          name: "mdi-book-cog",
          label: "Type Nilai",
        },
        {
          to: "mapel",
          name: "mdi-book-cog-outline",
          label: "Edit Mata Pelajaran",
        },
        {
          to: "berkas",
          name: "mdi-book",
          label: "Berkas-berkas",
        },
        {
          to: "admin-pendaftaran",
          name: "mdi-book-outline",
          label: "Pendaftaran",
        },
      ],
    };
  },
  mounted() {
    // this.getActivasi();
  },
  filters: {},
  computed: {
    ...mapGetters("users", ["loggedIn"]),
    // ...mapGetters('transaksi',['transaction']),
    ...mapState("users", ["user"]),
    bidder() {
      if (this.user.bidder == 1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions("users", ["logout"]),
    // ...mapActions("transaksi", ["getDataActivasi"]),
    signOut() {
      this.logout().then(() => {
        this.$router.replace(
          this.$route.query.redirect || { path: "/" },
          () => {}
        );
      });
    },

    // updateStatusBidder(){
    //     this.updateBidder()
    // },

    // getActivasi() {
    //     if (!this.bidder) {
    //         this.getDataActivasi()
    //     }
    // },

    // toActivasi() {
    //     if (!this.bidder) {
    //         this.$router.replace(
    //             this.$route.query.redirect || { name: "activasi"},
    //             () => {}
    //         )
    //     }

    // }
  },

  // watch: {
  //     transaction(val) {
  //         let status = val? val.status:null
  //         if (status == 'settlement') {
  //             this.updateStatusBidder()
  //             return false
  //         }
  //     }
  // }
};
</script>

<style lang="scss" scoped>
</style>