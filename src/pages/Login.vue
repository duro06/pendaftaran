<template>
  <q-page class="flex flex-center bg-light-blue-1">
    <q-card class="my-card q-pa-md">
      <q-card-section class="bg-blue-5 text-white text-center">
        <div class="text-h6">Login</div>
      </q-card-section>

      <email-input
        icon="email"
        label="e-mail"
        :email.sync="loginData.email"
      />
      
      <password-input
        icon="vpn_key"
        label=password
        :password.sync="loginData.password"
      />

          <!-- class="bg-primary" -->
      <q-card-actions align="center">
        <q-btn
          color="blue-5"
          glossy
          rounded
          @click="loginControl"
          :loading="loading"
          :disable="disable"
        >login</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name:'login',
  components:{
    'email-input' : () => import('components/shared/EmailInput.vue'),
    'password-input': require('components/shared/PasswordInput.vue').default
  },
  data(){
    return{
      loginData:{
        email:'',
        password:''
      },
      loading:false,
      disable:false
    }
  },
  methods:{
    // ...mapActions('user',['getUser']),
    loginControl(){
        this.disable = true
        this.loading = true
      return new Promise((resolve, reject) => {
        login(this.loginData)
        .then(res=>{
          this.disable = false
          this.loading = false
          this.getUser()
          this.$router.replace(
                this.$route.query.redirect || { path: "/" },
                () => {}
              )
          // location.reload()
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  }
}
</script>