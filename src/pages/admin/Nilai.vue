<template>
  <q-page class="q-pa-md">
    <q-btn
      color="primary"
      icon="mdi-plus"
      dense
      label="Tambah Type Nilai"
      no-caps
      @click="addType"
    />
    <q-list bordered>
      <div v-for="(type, index) in types" :key="index">
        <div v-if="skeleton">
          <q-item style="max-width: 300px">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
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
    ...mapGetters("users", ["skeleton"]),
  },
  data() {
    return {
      currentIndex: null,
      currentData: [],
    };
  },
  methods: {
    addType(val) {
      console.log("add mapel", this.type.id);
    },
  },
};
</script>