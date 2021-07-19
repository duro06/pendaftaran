<template>
  <div class="row q-my-md">
    <div class="col">
      <q-input
        :value="value"
        v-model="nilai"
        :label="label"
        :placeholder="'isi dengan nilai' + placeholder"
        dense
        @blur="update"
        :loading="loading"
      />
    </div>

    <div class="col-2">
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
    </div>
    <!-- <q-dialog v-model="enlarge"> -->
    <!-- <expand-picture -->
    <expand-picture
      :media="path == null ? 'images/no_image.png' : storage + path"
      :enlarge="enlarge"
      :mapel="this.placeholder"
      :nilai="this.nilai"
      @tutup="enlarge = false"
    />
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
      picture: null,
      loading: false,
      enlarge: false,
    };
  },
  computed: {
    ...mapGetters("users", ["storage", "user"]),
  },
  mounted() {
    console.log("value", this.value);
    if (this.value != null) {
      this.nilai = this.value;
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
        mapel_id: this.id,
        nilai_id: this.nilai_id,
        nilai: this.nilai,
        mapel_name: this.placeholder,
      };
      if (this.nilai) {
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
      console.log("data", data);
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
    value() {
      this.nilai = this.value;
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
