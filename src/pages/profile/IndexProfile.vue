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
      <q-list bordered>
        <!-- member -->
        <!-- <q-item clickable v-ripple @click="toActivasi">
                    <q-item-section avatar>
                        <div class="row">
                            <q-icon name="admin_panel_settings" size="25px" :color="bidder? 'secondary': 'primary'" />
                            <span class="q-ml-sm q-mt-xs f-13" :class="{bidder:bidder, 'text-secondary':'text-primary'}">{{bidder? 'Bidder': 'Non Bidder'}}</span>
                        </div>
                    </q-item-section>

                    <q-item-section>
                       <q-item-label caption></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                       <div class="row">
                            <span class="q-ml-sm q-mt-xs f-13">{{bidder? 'Activated': 'Activasi'}}</span>
                            <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
                        </div>
                    </q-item-section>
                    
                      
                </q-item> -->

        <!-- Deposit -->
        <!-- <q-separator />
                <q-item clickable v-ripple to="/profile/deposit">
                    <q-item-section avatar>
                        <div class="row">
                            <q-icon name="eva-credit-card-outline" size="25px" />
                            <span class="q-ml-sm q-mt-xs f-13">Deposit</span>
                        </div>
                    </q-item-section>
                    <q-item-section>
                       <q-item-label caption></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                       <div class="row">
                            <span class="q-ml-sm q-mt-xs f-13">Rp. 0</span>
                            <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
                        </div>
                    </q-item-section>
                    
                      
                </q-item> -->

        <!-- Transaksi -->
        <!-- <q-separator />
                <q-item clickable v-ripple to="/profile/transaksi">
                    <q-item-section avatar>
                        <div class="row">
                            <q-icon name="eva-shopping-bag-outline" size="25px" />
                            <span class="q-ml-sm q-mt-xs f-13">Transaksi</span>
                        </div>
                    </q-item-section>
                    <q-item-section>
                       <q-item-label caption></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                       <div class="row">
                            <span class="q-ml-sm q-mt-xs f-13"></span>
                            <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
                        </div>
                    </q-item-section>
                    
                      
                </q-item> -->

        <!-- lelang -->
        <!-- <q-separator />
                <q-item clickable v-ripple to="/profile/lelang">
                    <q-item-section avatar>
                        <div class="row">
                            <q-icon name="eva-archive-outline" size="25px" />
                            <span class="q-ml-sm q-mt-xs f-13">Lelang</span>
                        </div>
                    </q-item-section>
                    <q-item-section>
                       <q-item-label caption></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                       <div class="row">
                            <span class="q-ml-sm q-mt-xs f-13">Preview</span>
                            <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
                        </div>
                    </q-item-section>
                    
                      
                </q-item> -->

        <!-- Edit Profile -->
        <q-separator />
        <q-item clickable v-ripple to="/profile/edit_profile">
          <q-item-section avatar>
            <div class="row">
              <q-icon name="eva-person-outline" size="25px" />
              <span class="q-ml-sm q-mt-xs f-13">Edit Profile</span>
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

        <!-- Logout -->
        <q-separator />
        <q-item clickable v-ripple @click="signOut">
          <q-item-section avatar>
            <div class="row">
              <q-icon name="eva-power-outline" size="25px" />
              <span class="q-ml-sm q-mt-xs f-13">Logout</span>
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
    };
  },
  mounted() {
    // this.getActivasi();
  },
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