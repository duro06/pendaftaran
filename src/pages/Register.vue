<template>
  <q-page class="flex flex-center bg-light-blue-1">

    <q-card class="q-pa-md">
      <q-card-section class="bg-yellow-3 text-primary text-center">
        <div class="text-h6">Register</div>

        <data-input
          icon="fas fa-id-badge"
          label="Nama"
          :text.sync="registerData.name"
        />

        <email-input
          icon="email"
          label="e-mail"
          :email.sync="registerData.email"
        />

        <password-input
          icon="fas fa-lock"
          label="password"
          :password.sync="registerData.password"
        />
      </q-card-section>
    </q-card>

  </q-page>
</template>
<script>
export default {
  name:'register',
  components:{
    'data-input':()=>import('components/shared/CommonInput'),
    'email-input':()=>import('components/shared/EmailInput'),
    'password-input':()=>import('components/shared/PasswordInput')
  },
  data(){
    return{
      registerData:{
        email:'',
        password:'',
        name:''
      },
      loading:false,
      disable:false
    }
  }
}
</script>