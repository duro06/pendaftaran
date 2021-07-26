<template>
  <q-page class="flex flex-center bg-light-blue-1">
    <q-card class="my-card q-pa-md">
      <q-card-section class="bg-blue-5 text-white text-center">
        <div class="text-h6">Login</div>
      </q-card-section>

      <email-input icon="email" label="e-mail" :email.sync="loginData.email" />

      <password-input
        icon="vpn_key"
        label="password"
        :password.sync="loginData.password"
        @keyup.enter="loginControl"
      />

      <!-- class="bg-primary" -->
      <div class="row justify-center"></div>
      <q-card-actions align="center">
        <q-btn
          class="full-width"
          color="blue-5"
          glossy
          no-caps
          @click="loginControl"
          :loading="loading"
          :disable="disable"
          >Login</q-btn
        >
      </q-card-actions>

      <div class="row justify-center">
        <div class="col">
          <q-card-actions align="center">
            <q-btn color="blue-5" flat no-caps rounded :to="{ name: 'daftar' }"
              >Belum Punya Akun</q-btn
            >
          </q-card-actions>
        </div>
        <div class="col">
          <q-card-actions align="center">
            <q-btn color="blue-5" flat no-caps rounded :to="{ name: 'profile' }"
              >kembali ke profile</q-btn
            >
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  components: {
    'email-input': () => import('components/shared/EmailInput.vue'),
    'password-input': require('components/shared/PasswordInput.vue').default,
  },
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      loading: false,
      disable: false,
    }
  },
  methods: {
    ...mapActions('users', ['login', 'getUser']),
    loginControl() {
      this.disable = true
      this.loading = true
      return new Promise((resolve, reject) => {
        this.login(this.loginData)
          .then((res) => {
            this.disable = false
            this.loading = false
            this.getUser().then((res) => {
              const identity = res.id
              this.$store.dispatch('messaging/getMessageToken').then((res) => {
                const data = {
                  id: identity,
                  token: res,
                }
                this.$store.dispatch('users/saveFirebaseToken', data)
              })
            })
            this.$router.replace(this.$route.query.redirect || { path: '/' }, () => {})
            // location.reload()
            resolve(res)
          })
          .catch((err) => {
            this.disable = false
            this.loading = false
            reject(err)
          })
      })
    },
  },
}
</script>
