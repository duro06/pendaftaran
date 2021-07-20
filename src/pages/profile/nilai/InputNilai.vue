<template>
  <div class="row q-my-md">
    <div class="col">
      <q-input
        ref="masuk"
        :value="mapel.nilai"
        v-model="nilai"
        :label="mapel.mapel.name"
        :placeholder="'isi dengan nilai ' + mapel.mapel.name"
        dense
        :loading="loading"
        :disable="disable"
        @blur="toDisable"
      />
    </div>
    <div class="col-2">
      <q-btn icon="mdi-grease-pencil" @click="focus" color="blue" dense />
      <q-btn
        :icon="disable ? 'mdi-information-outline' : 'mdi-send-outline'"
        :color="disable ? 'red' : 'green'"
        dense
        :disable="disable"
        :loading="loading"
        @click="updateData"
      />
    </div>
    <!-- <expand-picture
      :media="path == null ? 'images/no_image.png' : storage + path"
      :enlarge="enlarge"
      :mapel="this.placeholder"
      :nilai="this.nilai"
      @tutup="enlarge = false"
    /> -->
    <!-- </q-dialog> -->
    <!-- :enlarge="enlarge" -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NilaiInput",
  components: {
    "expand-picture": () => import("components/shared/ExpandPicture"),
  },
  props: ["mapel", "user_id", "type_id"],
  data() {
    return {
      nilai: null,
      nilaiPrev: null,
      picture: null,
      loading: false,
      enlarge: false,
      disable: true,
    };
  },
  computed: {
    ...mapGetters("users", ["storage", "user"]),
  },
  mounted() {
    console.log("value", this.mapel.nilai);
    if (this.mapel.nilai != undefined) {
      this.nilai = this.mapel.nilai;
      this.nilaiPrev = this.mapel.nilai;
    }
  },
  methods: {
    focus() {
      const vm = this;
      this.disable = !this.disable;
      setTimeout(() => {
        vm.$refs.masuk.focus();
      }, 20);
    },
    toDisable() {
      setTimeout(() => {
        this.disable = true;
      }, 100);
    },
    updateData() {
      let data = {
        id: this.mapel.id,
        nilai: this.nilai,
      };
      let params = {
        params: {
          user_id: this.user_id,
          type_id: this.type_id,
        },
      };
      console.log("update", data);

      this.loading = true;
      this.$store
        .dispatch("nilai/updateMapel", data)
        .then(() => {
          this.$store.dispatch("users/getUser").then(() => {
            this.$store.dispatch("nilai/getMapels");
            this.$store.dispatch("nilai/getNilaiBy", params);
          });
          this.loading = false;
          this.disable = true;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    upload(file) {
      const formData = new FormData();
      formData.append("image", file);
      let data = {
        id: this.media_id,
        mapel_id: this.id,
        nilai_id: this.nilai_id,
        data: formData,
      };
      this.$q.loading.show();

      this.$store
        .dispatch("nilai/uploadImage", data)
        .then((res) => {
          this.$store.dispatch("users/getUser").then(() => {
            this.$store.dispatch("nilai/getMapels");
          });
          this.$q.loading.hide();
          console.log("upload", res);
        })
        .catch((err) => {
          this.$q.loading.hide();
          console.log(err);
        });
    },
  },
  watch: {
    picture() {
      this.upload(this.picture);
      this.picture = null;
    },
  },
};
</script>

<style scoped>
</style>
