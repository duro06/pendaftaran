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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NilaiInput",

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
  },
  watch: {},
};
</script>

<style scoped>
</style>
