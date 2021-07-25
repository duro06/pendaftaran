<template>
  <q-page class="q-pa-md">
    <q-btn
      color="primary"
      icon="mdi-plus"
      dense
      label="Buka Pendaftaran Baru"
      no-caps
      @click="addDialog = true"
    />
    <div>
      <!-- <q-list bordered>
        <div v-for="(pendaftaran, index) in pendaftarans" :key="index">
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
          <Pendaftaran :pendaftaran="pendaftaran" :index="index" />

          <AddType
          :confirm="addDialog"
          namaAdd="type nilai"
          judul="Tambah Type Nilai"
          @save="addType"
          @cancel="addDialog = false"
        />
        </div>
      </q-list> -->
    </div>
    <q-list bordered class="q-my-md">
      <div class="row justify-left items-center">
        <div class="col-3 text-h6">Nama</div>
        <div class="col-2 text-h6">status</div>
        <div class="col-3 text-h6">Mulai</div>
        <div class="col-3 text-h6">Berakhir</div>
        <!-- <div class="col-2">Action</div> -->
      </div>
      <q-separator />
      <div v-for="(pendaftaran, index) in pendaftarans" :key="index">
        <TabelPendaftaran :pendaftaran="pendaftaran" :index="index" />
      </div>
    </q-list>
    <AddPendaftaran
      judul="Tambah Pendaftaran"
      namaAdd="Pendaftaran"
      :confirm="addDialog"
      @save="onSave"
      @cancel="addDialog = false"
    />
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
import Pendaftaran from "pages/admin/pendaftaran/Pendaftaran.vue";
import TabelPendaftaran from "pages/admin/pendaftaran/TablePendaftaran.vue";
import AddPendaftaran from "pages/admin/pendaftaran/AddPendaftaran.vue";
export default {
  name: "IndexPendaftaran",
  components: { Pendaftaran, TabelPendaftaran, AddPendaftaran },
  data() {
    return {
      addDialog: false,
    };
  },
  computed: {
    ...mapGetters("pendaftaran", ["pendaftarans"]),
    ...mapGetters("users", ["skeleton"]),
  },
  methods: {
    onSave(val) {
      this.addDialog = false;
      console.log("Save", val);
    },
  },
};
</script>