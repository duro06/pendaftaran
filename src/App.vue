<template>
  <div id="q-app">
    <div class="mobile-only">
      <router-view />
      
    </div>
    <div class="desktop-only bg-amber-2">
      <div class="full-height">
        <p class="flex flex-center">Mohon maaf, halaman ini hanya dirancang untuk digunakan pada ponsel</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
