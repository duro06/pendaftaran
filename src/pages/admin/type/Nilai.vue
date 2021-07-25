<template>
  <q-page class="q-pa-md">
    <q-btn
      color="primary"
      icon="mdi-plus"
      dense
      label="Tambah Type Nilai"
      no-caps
      @click="addDialog = true"
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
        <AddType
          :confirm="addDialog"
          namaAdd="type nilai"
          judul="Tambah Type Nilai"
          @save="addType"
          @cancel="addDialog = false"
        />
      </div>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
import TypeList from "pages/admin/type/TypeList.vue";
import AddType from "pages/admin/type/AddType.vue";

export default {
  name: "AdminNilai",
  components: {
    TypeList,
    AddType,
  },
  computed: {
    ...mapGetters("nilai", ["types"]),
    ...mapGetters("users", ["skeleton"]),
  },
  data() {
    return {
      currentIndex: null,
      currentData: [],
      addDialog: false,
    };
  },
  methods: {
    addType(val) {
      console.log("add mapel", val);
      let data = {
        name: val.name,
      };
      this.$q.loading.show();
      this.$store
        .dispatch("nilai/adminAddType", data)
        .then(() => {
          this.$store.dispatch("nilai/getType").then(() => {
            this.$q.loading.hide();
          });
          this.addDialog = false;
        })
        .catch(() => {
          this.addDialog = false;
          this.$q.loading.hide();
        });
    },
  },
};
</script>