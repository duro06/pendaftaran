<template>
  <div>{{ mapels }}</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "IsiNilai",
  created() {
    this.getMapels();
  },
  computed: {
    ...mapGetters("nilai", ["mapels"]),
  },
  methods: {
    ...mapActions("nilai", ["getMapels"]),
  },
};
</script>