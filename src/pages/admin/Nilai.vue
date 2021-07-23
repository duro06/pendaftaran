<template>
  <q-page class="q-pa-md">
    <q-list bordered>
      <div v-for="(type, index) in types" :key="index">
        <TypeList :type="type" :index="index" />
      </div>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
import TypeList from "pages/admin/type/TypeList.vue";

export default {
  name: "AdminNilai",
  components: {
    TypeList,
  },
  computed: {
    ...mapGetters("nilai", ["types"]),
  },
  data() {
    return {
      currentIndex: null,
      currentData: [],
    };
  },
};
</script>