<template>
  <div>
    <q-dialog v-model="enlarge" :maximized="true">
      <q-card class="my-card">
        <q-img :src="media" />

        <q-card-section> </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">{{ nilai }}</div>
          <div class="text-caption text-grey">
            {{ mapel }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="primary" label="close" @click="$emit('tutup', true)" />
          <!-- <q-btn v-close-popup flat color="primary" round icon="event" /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "Expand",
  props: ["media", "enlarge", "nilai", "mapel"],
  data() {
    return {
      card: true,
    };
  },
  //   methods: {
  //     close() {
  //       this.$emit("tutup", true);
  //     },
  //   },
  //   watch: {
  //     enlarge() {
  //       this.card = this.enlarge;
  //     },
  //   },
};
</script>
<style scoped>
.my-card {
  min-width: 250px;
}
</style>