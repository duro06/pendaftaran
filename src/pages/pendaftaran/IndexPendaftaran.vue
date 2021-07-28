<template>
  <q-page>
    <div class="q-pa-lg">
      <q-list v-if="!details" bordered class="q-my-sm">
        <div v-for="(pendaftaran, index) in pendaftarans" :key="index" class="q-ma-xs">
          <pendaftaran :index="index" :pendaftaran="pendaftaran" @diclick="toDetails" />
        </div>
      </q-list>
    </div>
    <div class="q-pa-lg absolute-center" v-if="details">
      <div v-if="!pesertas.length">
        <div class="row justify-center">
          <div class="col items-center">
            <q-btn
              class="self-center"
              style="opacity: 0.5"
              round
              outline
              color="primary"
              icon="mdi-format-list-checkbox"
              size="32px"
              disable
            />
            <div>belum ada data</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-lg" v-if="details">
      <div
        v-if="!registered || pendaftarans[current_index].status != 1"
        class="text-center"
      >
        <q-btn rounded color="primary" label="daftar" no-caps @click="daftar" />
      </div>
      <div v-if="pesertas.length">
        <peserta />
      </div>
    </div>
    <q-page-sticky v-if="details" position="top-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="arrow_back" @click="details = false" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index-pendaftaran',
  components: {
    pendaftaran: () => import('pages/pendaftaran/Pendaftaran'),
    peserta: () => import('pages/pendaftaran/Peserta'),
  },
  data() {
    return {
      details: false,
      current_index: null,
      current_id: null,
    }
  },
  created() {
    this.getPendaftarans()
    // this.getPesertas()
  },
  computed: {
    ...mapGetters('pendaftaran', ['pendaftarans', 'pesertas', 'registered']),
    ...mapGetters('users', ['user']),
  },
  methods: {
    ...mapActions('pendaftaran', ['getPendaftarans', 'getPesertas', 'daftarPeserta']),
    toDetails(val) {
      this.details = true
      this.current_index = val.index
      this.current_id = val.id
      let data = {
        params: {
          pendaftaran_id: val.id,
        },
      }
      this.$q.loading.show({ message: 'Fetching data... please wait' })
      this.getPesertas(data)
        .then(() => {
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    daftar() {
      let data = {
        pendaftaran_id: this.current_id,
      }
      let params = {
        params: {
          pendaftaran_id: this.current_id,
        },
      }
      this.$q.loading.show()
      this.daftarPeserta(data)
        .then(() => {
          this.$store.dispatch('pendaftaran/getPesertas', params)
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
  },
}
</script>
