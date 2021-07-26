<template>
  <div id="q-app">
    <router-view />
    <button id="notif" @click="notif" style="display: none"></button>
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
import { mapGetters } from "vuex";
import { messaging } from "boot/firebase";
let notificationSplit = "";
let clickAction = "";
let sender = "";
messaging.onMessage((payload) => {
  console.log("in App", payload);
  console.log("split", payload.notification.body.split(" "));
  sender = payload.data.sender;
  notificationSplit = payload.notification.body.split(" ");
  clickAction = payload.notification.click_action.split("/");
  console.log("click Action ", clickAction);
  let button = document.getElementById("notif");
  console.log(button);
  button.click();
});
export default {
  name: "App",
  computed: {
    ...mapGetters("messaging", ["swToken"]),
  },
  mounted() {
    if (this.$q.localStorage.getItem("token")) {
      this.$store.dispatch("users/skeletonTrue");
      this.$store.dispatch("users/getUser").then((res) => {
        const identity = res.id;
        this.$store.dispatch("messaging/getMessageToken").then((res) => {
          const data = {
            id: identity,
            token: res,
          };
          this.$store.dispatch("users/saveFirebaseToken", data);
        });
        this.$store.dispatch("nilai/getMapels");
        this.$store.dispatch("nilai/getType").then(() => {
          this.$store.dispatch("users/skeletonFalse");
        });
        this.$store.dispatch("profile/getBio");
        if (res.role == "Admin") {
          this.$store.dispatch("pendaftaran/getPendaftarans");
          this.$store.dispatch("berkas/getBerkas");
        }
        // this.$store.dispatch("messaging/getAllChat");
      });
      // this.$store.dispatch("notifications/getNotificationByCurrentId");
    }
  },
  methods: {
    notif() {
      console.log("notsplit", notificationSplit);
      console.log("click", clickAction);
      // this.$store.dispatch("notifications/getNotificationByCurrentId");

      // lelang almost
      if (notificationSplit[0] == "Bid" && notificationSplit[1] == "baru") {
        let params = {
          params: {
            per_page: 10,
            sortby: "berakhir",
            sort: "ASC",
            q: "",
          },
        };
        this.$store.dispatch("lelang/getLelangHampirUsai", params);
      }

      // untuk chat
      if (notificationSplit[0] == "chat" && notificationSplit[1] == "baru") {
        let params = {
          params: {
            page: 1,
            lelang_id: parseInt(clickAction[clickAction.length - 1]),
          },
        };
        this.$store.dispatch("messaging/updateChattings", params);
      }

      // untuk bid baru
      // if (notificationSplit[0] == "Bid" && notificationSplit[1] == "baru") {
      //   this.$store.dispatch("lelang/getLelangById", clickAction[1]);
      // }

      //untuk transaksi
      // if (sender == "Admin") {
      //   if (notificationSplit[0] == "Transaksi") {
      //     let order_id = notificationSplit[1];

      //     let params = {
      //       params: {
      //         invoice: order_id,
      //       },
      //     };

      //     this.$store.dispatch("transaksi/getWhere", params);
      //   }
      // }
    },
  },
};
</script>
