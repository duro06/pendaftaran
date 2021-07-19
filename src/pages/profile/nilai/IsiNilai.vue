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
              >
                <q-file v-model="picture" dense>
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-camera-plus"
                      color="white"
                      class="absolute all-pointer-events"
                      style="top: 8px; left: 8px"
                    />
                  </template>
                </q-file>
              </q-img>
            </q-responsive>
          </div>
        </div>
        <div v-for="(mapel, index) in nilais" :key="index">
          <input-nilai :mapel="mapel" @goback="details = false" />
          <!-- <input-nilai
            :label="mapel.mapel.name"
            :id="mapel.id"
            :placeholder="mapel.mapel.name"
            :path="
              mapel.media == undefined || mapel.media == null
                ? null
                : mapel.media
            "
            :value="mapel.nilai == null ? null : mapel.nilai"
            :nilai_id="
              mapel.nilai_id == undefined || mapel.nilai_id == null
                ? null
                : mapel.nilai_id
            "
            :media_id="
              mapel.media_id == undefined || mapel.media_id == null
                ? null
                : mapel.media_id
            "
            @goback="details = false"
          /> -->
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
                icon="mdi-plus-circle-outline"
                @click="store"
                color="primary"
                dense
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="arrow_back" @click="details = false" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "IsiNilai",
  components: {
    "input-nilai": () => import("pages/profile/nilai/InputNilai"),
    "list-type": () => import("pages/profile/nilai/ListType"),
  },
  data() {
    return {
      nilai: 0,
      mapel_id: null,
      details: false,
      image: null,
      picture: null,
      index_type: null,
      current_mapels: [],
      loading: false,
    };
  },
  created() {
    this.getType();
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
    },
    listListener(val) {
      this.current_mapels = [];
      let temp_mapel = [];
      let same_index = [];
      let same = [];
      let indexof = [];
      let all_index = [];
      let params = {
        params: {
          user_id: this.user.id,
          type_id: val.id,
        },
      };
      this.mapels.forEach((mapel) => {
        if (mapel.type_id == this.types[val.index].id) {
          temp_mapel.push(mapel);
        }
      });
      console.log("temp", temp_mapel);
      this.index_type = val.index;
      this.image = this.types[val.index].media.path;
      this.getNilaiBy(params).then(() => {
        temp_mapel.forEach((mapel, inde) => {
          all_index.push(inde);
          this.nilais.forEach((data, index) => {
            if (mapel.id == data.mapel_id) {
              same_index.push(index);
              same.push(mapel);
            }
          });
        });
        same.forEach((data) => {
          indexof.push(temp_mapel.indexOf(data));
          let iof = temp_mapel.indexOf(data);
          temp_mapel.splice(iof, 1);
        });
        console.log("indexoff", indexof);
        // if (same_index.length) {
        //   same_index.forEach((index) => {
        //     temp_mapel.splice(index, 1);
        //   });
        // }
        temp_mapel.map((data) => {
          this.current_mapels.push({
            label: data.name,
            value: data.id,
          });
        });
        this.details = true;
        console.log("same", same_index);
        console.log("all", all_index);
        console.log("current mapel", this.current_mapels);
      });
      console.log(val);
    },
  },
  watch: {
    user() {},
  },
};
</script>