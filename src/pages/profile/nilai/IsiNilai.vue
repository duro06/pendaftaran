<template>
  <q-page>
    <div class="q-pa-lg">
      <!-- <q-input v-model="nilai" label="Label" placeholder="Placeholder"  /> -->
      <q-list bordered class="q-py-sm">
        <div v-for="(type, index) in types" :key="index">
          <list-type
            :index="index"
            :id="type.id"
            :label="type.name"
            icon="mdi-note-text-outline"
            @diclick="listListener"
          />
        </div>
      </q-list>
      <!-- <input-nilai
          :label="mapel.name"
          :id="mapel.id"
          :placeholder="mapel.name"
          :path="mapel.media"
          :value="mapel.nilai == null ? null : mapel.nilai"
          :nilai_id="mapel.nilai_id"
          :media_id="mapel.media_id"
        /> -->
    </div>
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
    };
  },
  created() {
    this.getType();
  },
  computed: {
    ...mapGetters("nilai", ["types"]),
    ...mapGetters("users", ["user"]),
  },
  methods: {
    ...mapActions("nilai", ["getType"]),
    listListener(val) {
      console.log(val);
    },
  },
};
</script>