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
    <div class="text-right">
      <q-toggle
        v-model="trashed"
        @change="getTrashed"
        color="blue"
        :label="trashed == true ? 'aktif' : 'tidak aktif'"
        left-label
      />
    </div>
    <div></div>
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
        <TabelPendaftaran
          :pendaftaran="pendaftaran"
          :index="index"
          :trashed="trashed"
          @aktifkan="trashed = true"
        />
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
import { mapGetters } from 'vuex'
import Pendaftaran from 'pages/admin/pendaftaran/Pendaftaran.vue'
import TabelPendaftaran from 'pages/admin/pendaftaran/TablePendaftaran.vue'
import AddPendaftaran from 'pages/admin/pendaftaran/AddPendaftaran.vue'
export default {
  name: 'IndexPendaftaran',
  components: { Pendaftaran, TabelPendaftaran, AddPendaftaran },
  data() {
    return {
      addDialog: false,
      trashed: true,
    }
  },
  computed: {
    ...mapGetters('pendaftaran', ['pendaftarans']),
    ...mapGetters('users', ['skeleton']),
  },
  methods: {
    onSave(val) {
      this.$q.loading.show()
      this.addDialog = false
      this.$store
        .dispatch('pendaftaran/addPendaftaran', val)
        .then(() => {
          this.$store
            .dispatch('pendaftaran/getPendaftarans')
            .then(() => {
              if (this.trashed == false) {
                this.trashed = true
              }
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    getTrashed() {
      this.$q.loading.show()
      if (!this.trashed) {
        this.$store
          .dispatch('pendaftaran/getTrashedPendaftarans')
          .then(() => {
            this.$q.loading.hide()
          })
          .catch(() => {
            this.$q.loading.hide()
          })
      } else {
        this.$store
          .dispatch('pendaftaran/getPendaftarans')
          .then(() => {
            this.$q.loading.hide()
          })
          .catch(() => {
            this.$q.loading.hide()
          })
      }
    },
  },
  watch: {
    trashed() {
      this.getTrashed()
    },
  },
}
</script>
