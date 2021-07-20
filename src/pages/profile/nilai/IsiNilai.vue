<template>
  <q-page>
    <div class="q-pa-lg">
      <!-- <q-input v-model="nilai" label="Label" placeholder="Placeholder"  /> -->
      <q-list v-if="!details" bordered class="q-py-sm">
        <div class="row justify-evenly">
          <div
            v-for="(type, index) in types"
            :key="index"
            class="col-5 q-ma-xs"
          >
            <list-type
              :index="index"
              :id="type.id"
              :label="type.name"
              :path="
                type.media.path == null
                  ? 'images/no_image.png'
                  : storage + type.media.path
              "
              icon="mdi-note-text-outline"
              @diclick="listListener"
              @besarkan="enlarge = true"
            />
          </div>
        </div>
      </q-list>
      <div v-if="details">
        <div class="row justify-center">
          <div class="col-3">
            <q-responsive :ratio="3 / 4">
              <q-img
                :src="image == null ? 'images/no_image.png' : storage + image"
                no-native-menu
                @click="enlarge = true"
              >
                <!-- <q-file
                  v-model="picture"
                  dense
                  style="z-index: 99"
                  @click="enlarge = false"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-camera-plus"
                      color="white"
                      class="absolute all-pointer-events"
                      style="top: 8px; left: 8px"
                    />
                  </template>
                </q-file> -->
              </q-img>
            </q-responsive>
          </div>
          <div class="col-1">
            <q-file
              class="offset"
              v-model="picture"
              dense
              style="z-index: 99"
              @click="enlarge = false"
            >
              <template v-slot:prepend>
                <q-icon
                  name="mdi-lead-pencil"
                  color="blue"
                  class="absolute all-pointer-events"
                  style="top: 8px; left: 8px"
                />
              </template>
            </q-file>
          </div>
        </div>
        <div v-for="(mapel, index) in nilais" :key="index">
          <input-nilai
            :mapel="mapel"
            :user_id="user.id"
            :type_id="current_type_id"
            @goback="details = false"
          />
        </div>

        <div v-if="current_mapels.length">
          <div class="row">
            <div class="col-5">
              <q-select
                filled
                dense
                options-dense
                v-model="mapel_id"
                label="Mata Pelajaran"
                :options="current_mapels"
                behavior="dialog"
              />
            </div>
            <div class="col-5">
              <q-input v-model="nilai" dense :loading="loading" />
            </div>
            <div class="col-2">
              <q-btn
                :icon="
                  nilai > 0 && mapel_id
                    ? 'mdi-send-outline'
                    : 'mdi-information-outline'
                "
                @click="store"
                :color="nilai > 0 && mapel_id ? 'green' : 'red'"
                dense
                :disable="nilai > 0 && mapel_id ? false : true"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-page-sticky v-if="details" position="top-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="arrow_back" @click="details = false" />
    </q-page-sticky>
    <expand-picture
      :media="
        types[current_type_index] != undefined
          ? types[current_type_index].media.path == null
            ? 'images/no_image.png'
            : storage + types[current_type_index].media.path
          : 'images/no_image.png'
      "
      :enlarge="enlarge"
      :mapel="
        types[current_type_index] != undefined
          ? types[current_type_index].name
          : null
      "
      @tutup="enlarge = false"
    />
    <!-- </q-dialog> -->
    <!-- :enlarge="enlarge" -->
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "IsiNilai",
  components: {
    "input-nilai": () => import("pages/profile/nilai/InputNilai"),
    "list-type": () => import("pages/profile/nilai/ListType"),
    "expand-picture": () => import("components/shared/ExpandPicture"),
  },
  data() {
    return {
      nilai: 0,
      mapel_id: null,
      details: false,
      image: null,
      picture: null,
      enlarge: false,

      current_type_index: null,
      current_mapels: [],
      current_type_id: null,

      loading: false,
    };
  },
  created() {
    this.getType();
    if (this.user.id && this.current_type_id) {
      let params = {
        params: {
          user_id: this.user.id,
          type_id: this.current_type_id,
        },
      };
      this.getNilaiBy(params);
    }
  },
  computed: {
    ...mapGetters("nilai", ["types", "nilais", "mapels"]),
    ...mapGetters("users", ["user", "storage"]),
  },
  methods: {
    ...mapActions("nilai", ["getType", "getNilaiBy"]),
    store() {
      console.log("id", this.mapel_id);
      console.log("nilai", this.nilai);
      let data = {
        user_id: this.user.id,
        mapel_id: this.mapel_id.value,
        type_id: this.current_type_id,
        nilai: this.nilai,
        mapel_name: this.mapel_id.label,
      };
      let params = {
        params: {
          user_id: this.user.id,
          type_id: this.current_type_id,
        },
      };

      let temp_mapel = [];
      this.loading = true;
      this.$store
        .dispatch("nilai/isiMapel", data)
        .then(() => {
          this.nilai = 0;
          this.mapel_id = null;
          this.$store.dispatch("users/getUser").then(() => {
            this.$store.dispatch("nilai/getMapels").then(() => {
              this.mapels.forEach((mapel) => {
                if (mapel.type_id == this.types[this.current_type_index].id) {
                  temp_mapel.push(mapel);
                }
              });

              this.getNilaiBy(params).then(() => {
                this.maping(temp_mapel);
                this.details = true;
              });
            });
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    listListener(val) {
      // inisialisasi global
      this.current_type_index = val.index;
      this.current_type_id = val.id;

      this.current_mapels = [];
      let temp_mapel = [];
      this.mapels.forEach((mapel) => {
        if (mapel.type_id == this.types[val.index].id) {
          temp_mapel.push(mapel);
        }
      });

      this.image = this.types[val.index].media.path;
      console.log("temp", temp_mapel);

      let params = {
        params: {
          user_id: this.user.id,
          type_id: val.id,
        },
      };
      this.getNilaiBy(params).then(() => {
        this.maping(temp_mapel);
        this.details = true;
      });
      console.log(val);
    },
    maping(temp_mapel) {
      let same = [];
      let indexof = [];

      temp_mapel.forEach((mapel, inde) => {
        this.nilais.forEach((data, index) => {
          if (mapel.id == data.mapel_id) {
            same.push(mapel);
          }
        });
      });
      same.forEach((data) => {
        indexof.push(temp_mapel.indexOf(data));
        let iof = temp_mapel.indexOf(data);
        temp_mapel.splice(iof, 1);
      });
      this.current_mapels = [];
      temp_mapel.map((data) => {
        this.current_mapels.push({
          label: data.name,
          value: data.id,
        });
      });
    },

    upload(file) {
      const formData = new FormData();
      formData.append("image", file);
      let data = {
        id: this.types[this.current_type_index].media.id,
        data: formData,
      };
      this.$q.loading.show();

      this.$store
        .dispatch("nilai/uploadImage", data)
        .then((res) => {
          this.getType().then(() => {
            this.image = this.types[this.current_type_index].media.path;
          });
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
<style lang="scss" scoped>
</style>