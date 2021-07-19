<template>
  <q-page>
    <div class="q-pa-lg">
      <!-- <q-input v-model="nilai" label="Label" placeholder="Placeholder"  /> -->
      <div v-for="mapel in mapels" :key="mapel.id">
        <input-nilai
          :label="mapel.name"
          :id="mapel.id"
          :placeholder="mapel.name"
          :path="mapel.media"
          :value="mapel.nilai == null ? null : mapel.nilai"
          :nilai_id="mapel.nilai_id"
          :media_id="mapel.media_id"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "IsiNilai",
  components: {
    "input-nilai": () => import("pages/profile/nilai/InputNilai"),
  },
  data() {
    return {
      nilai: 0,
    };
  },
  created() {
    // this.getMapels();
  },
  computed: {
    ...mapGetters("nilai", ["mapels"]),
    ...mapGetters("users", ["user"]),
  },
  methods: {
    ...mapActions("nilai", ["getMapels"]),
  },
};
</script>