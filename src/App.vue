<template>
  <div id="q-app">
      <router-view />
    <!-- <div class="mobile-only">
    </div>
    <div class="desktop-only bg-amber-2">
      <div class="full-height">
        <p class="flex flex-center">
          Mohon maaf, halaman ini hanya dirancang untuk digunakan pada ponsel
        </p>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    if (this.$q.localStorage.getItem("token")) {
      this.$store.dispatch("users/getUser");
      // .then((res) => {
      // const identity = res.id;
      // this.$store.dispatch("messaging/getMessageToken").then((res) => {
      //   const data = {
      //     id: identity,
      //     token: res,
      //   };
      //   this.$store.dispatch("users/saveFirebaseToken", data);
      // });
      // this.$store.dispatch("messaging/getAllChat");
      // });
      // this.$store.dispatch("notifications/getNotificationByCurrentId");
    }
  },
};
</script>
