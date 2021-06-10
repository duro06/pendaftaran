<template>
  <div class="flex flex-center this-height">
    <div class="col column text-center">
      <div><q-icon size="3em" name="lock" color="grey" /></div>
      <div class="text-grey">Anda Belum Login</div>
      <div class="q-mt-md">
        <q-btn
          :to="{ name: 'login' }"
          flat
          dense
          label="login"
          color="primary"
        />
        /
        <q-btn
          :to="{ name: 'daftar' }"
          flat
          dense
          label="register"
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.this-height {
  min-height: 650px;
}
</style>