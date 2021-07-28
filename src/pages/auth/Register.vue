<template>
  <q-page class="flex flex-center bg-light-blue-1">
    <q-card class="q-pa-md">
      <q-card-section class="bg-yellow-3 text-primary text-center q-mb-lg">
        <div class="text-h6">Register</div>
      </q-card-section>

      <data-input
        icon="fas fa-id-badge"
        label="Nama lengkap"
        :text.sync="registerData.name"
      />

      <email-input icon="email" label="e-mail" :email.sync="registerData.email" />

      <password-input
        icon="fas fa-lock"
        label="password"
        :password.sync="registerData.password"
      />
      <password-input
        icon="fas fa-lock"
        label="confirm password"
        :password.sync="registerData.confirm"
        ref="passC"
        :sama.sync="registerData.password"
      />
      <q-select v-model="registerData.role" :options="options" label="Anda adalah" />
      <q-card-actions align="center">
        <q-btn
          color="blue-5"
          class="full-width"
          glossy
          rounded
          no-caps
          @click="lanjut"
          :loading="loading"
          :disable="disable"
          >Register</q-btn
        >
      </q-card-actions>
      <q-card-actions align="center">
        <q-btn color="blue-5" class="full-width" flat no-caps :to="{ name: 'login' }"
          >ke Login</q-btn
        >
      </q-card-actions>
    </q-card>
    <!-- confirmasi  -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <!-- <q-card-section class="row items-center justify-center">
          <q-avatar icon="info" color="white" text-color="yellow" />
        </q-card-section> -->
        <q-card-section class="row items-center">
          <div class="col">
            <div class="row">Anda akan mendaftar sebagai:</div>
            <div class="row">
              <div class="col">Nama :</div>
              <div class="col">{{ registerData.name }}</div>
            </div>
            <div class="row">
              <div class="col">Dengan Email :</div>
              <div class="col">{{ registerData.email }}</div>
            </div>
            <div class="row">
              <div class="col">Password :</div>
              <div class="col">{{ registerData.password }}</div>
            </div>
            <div class="row">
              <div class="col">Sebagai :</div>
              <div class="col">{{ registerData.role }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn no-caps flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            no-caps
            flat
            label="Lanjut mendaftar"
            @click="lanjut"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'register',
  components: {
    'data-input': () => import('components/shared/CommonInput'),
    'email-input': () => import('components/shared/EmailInput'),
    'password-input': () => import('components/shared/PasswordInput'),
  },
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        confirm: '',
        name: '',
        role: '',
      },
      options: ['Siswa', 'Orangtua', 'Guru'],
      loading: false,
      disable: false,
      confirm: false,
    }
  },
  methods: {
    ...mapActions('users', ['register']),
    lanjut() {
      this.disable = true
      this.loading = true
      this.register(this.registerData)
        .then((res) => {
          this.$router.replace(this.$route.query.redirect || { name: 'login' }, () => {})
          this.$q.notify('anda sudah bisa login')

          this.loading = false
          this.disable = false
        })
        .catch(() => {
          this.loading = false
          this.disable = false
        })
    },
    registerControl() {
      this.confirm = true
    },
  },
}
</script>
