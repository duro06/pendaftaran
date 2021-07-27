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
          <!-- <div v-if="accessTo(item.role)"> -->
          <div v-if="item.role == 'All' ? true : item.role == user.role">
            <q-separator />
            <q-item clickable v-ripple :to="item.to">
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
                  <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>

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
              <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  components: {
    HeaderProfile: () => import('src/pages/profile/HeaderProfile'),
    NoLogin: () => import('components/shared/NoLogin'),
  },
  data() {
    return {
      isLogin: true,
      adaFoto: false,
      items: [
        {
          to: '/profile/edit_profile',
          name: 'mdi-account',
          label: 'Edit Profile',
          role: 'All',
        },
        {
          to: '/profile/edit_cv',
          name: 'mdi-account-details',
          label: 'Edit CV',
          role: 'All',
        },
        {
          to: '/profile/edit_nilai',
          name: 'mdi-book-education-outline',
          label: 'Edit Nilai',
          role: 'Siswa',
        },
      ],
    }
  },
  mounted() {
    // this.getActivasi();
  },
  filters: {},
  computed: {
    ...mapGetters('users', ['loggedIn']),
    // ...mapGetters('transaksi',['transaction']),
    ...mapState('users', ['user']),
    bidder() {
      if (this.user.bidder == 1) {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions('users', ['logout']),
    // ...mapActions("transaksi", ["getDataActivasi"]),
    signOut() {
      this.$q.loading.show({ message: 'signing out . . . . .' })
      this.logout()
        .then(() => {
          this.$q.loading.hide()
          this.$router.replace(this.$route.query.redirect || { path: '/' }, () => {})
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
