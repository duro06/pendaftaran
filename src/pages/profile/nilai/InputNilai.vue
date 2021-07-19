<template>
  <div class="row q-my-md">
    <div class="col">
      <q-input
        :value="mapel.nilai"
        v-model="nilai"
        :label="mapel.mapel.name"
        :placeholder="'isi dengan nilai ' + mapel.mapel.name"
        dense
        @blur="update"
        :loading="loading"
      />
    </div>

    <!-- <div class="col-2">
      <q-responsive :ratio="1">
        <q-img
          :src="path == null ? 'images/no_image.png' : storage + path"
          no-native-menu
          @click="toEnlarge"
        >
          <q-file v-model="picture" dense>
            <template v-slot:prepend>
              <q-icon
                name="mdi-paperclip"
                color="black"
                class="absolute all-pointer-events"
                style="top: 8px; left: 8px"
              />
            </template>
          </q-file>
        </q-img>
      </q-responsive>
    </div> -->
    <!-- <q-dialog v-model="enlarge"> -->
    <!-- <expand-picture -->
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
  props: [
    "mapel",
    "label",
    "placeholder",
    "id",
    "path",
    "value",
    "nilai_id",
    "media_id",
  ],
  data() {
    return {
      nilai: null,
      nilaiPrev: null,
      picture: null,
      loading: false,
      enlarge: false,
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
    toEnlarge() {
      this.enlarge = true;
      console.log("enlarge");
    },
    tutup(val) {
      this.enlarge = false;
      console.log("tutup", val);
    },
    update() {
      let data = {
        id: this.user.id,
        mapel_id: this.mapel.mapel_id,
        nilai_id: this.mapel.id,
        nilai: this.mapel.nilai,
        mapel_name: this.mapel.mapel.name,
      };
      if (this.nilai !== this.nilaiPrev) {
        this.loading = true;
        this.$store
          .dispatch("nilai/isiMapel", data)
          .then(() => {
            this.$store.dispatch("users/getUser").then(() => {
              this.$store.dispatch("nilai/getMapels");
            });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
      // console.log("persamaan", this.nilai, this.nilaiPrev);
      // console.log("data", data);
      // console.log("mapel", this.mapel);
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
    mapel() {
      this.nilai = this.mapel.nilai;
      this.nilaiPrev = this.mapel.nilai;
    },
    picture() {
      this.upload(this.picture);
      this.picture = null;
    },
  },
};
</script>

<style scoped>
</style>
