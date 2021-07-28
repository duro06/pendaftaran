<template>
  <q-page class="q-pa-md">
    <div class="q-pa-sm row">
      <div class="col-3 q-ml-lg q-mt-sm">Nama Sekolah</div>
      <div class="col">
        <data-input icon="mdi-school" label="Nama Sekolah" :text.sync="form.nama" />
      </div>
    </div>
    <div class="q-pa-sm row">
      <div class="col-3 q-ml-lg q-mt-sm">Alamat</div>
      <div class="col">
        <data-input icon="mdi-map-marker" label="Alamat" :text.sync="form.alamat" />
      </div>
    </div>
    <div class="q-pa-sm row">
      <div class="col-3 q-ml-lg q-mt-sm">Kecamatan</div>
      <div class="col">
        <data-input icon="mdi-map" label="Kecamatan" :text.sync="form.kecamatan" />
      </div>
    </div>
    <div class="q-pa-sm row">
      <div class="col-3 q-ml-lg q-mt-sm">Email</div>
      <div class="col">
        <email-input icon="email" label="e-mail" :email.sync="form.email" />
      </div>
    </div>
    <div class="q-pa-sm row">
      <div class="col-3 q-ml-lg q-mt-sm">Telepon</div>
      <div class="col">
        <data-input icon="mdi-phone" label="Nomor Telepon" :text.sync="form.telepon" />
      </div>
    </div>
    <div class="q-pa-sm row items-center">
      <div class="col-3 q-ml-lg">Provinsi</div>
      <div class="col">
        <q-select
          filled
          dense
          options-dense
          v-model="form.provinsi"
          label="Provinsi"
          :options="provinsiOpt"
          behavior="dialog"
          :loading="loadingProv"
        />
      </div>
    </div>
    <div class="q-pa-sm row items-center">
      <div class="col-3 q-ml-lg">Kota</div>
      <div class="col">
        <q-select
          filled
          dense
          options-dense
          v-model="form.kota"
          label="Kota/ Kabupaten"
          :options="kotaOpt"
          behavior="dialog"
          :loading="loadingKota"
        />
      </div>
    </div>
    <div class="q-my-lg">
      <div class="row">
        <div class="col q-ml-lg">
          <q-btn no-caps label="Simpan" @click="onSave" color="primary" />
        </div>
        <div class="col">
          <q-btn
            no-caps
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="onReset"
          />
          <!-- @click="isiDulu" -->
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'IndexSekolah',
  components: {
    'data-input': () => import('components/shared/CommonInput'),
    'email-input': () => import('components/shared/EmailInput'),
  },
  data() {
    return {
      form: {
        nama: null,
        alamat: null,
        kecamatan: null,
        email: null,
        telepon: null,
        kota: null,
        provinsi: null,
      },

      provinsiOpt: [],
      kotaOpt: [],
      loadingProv: false,
      loadingKota: false,
    }
  },
  created() {
    this.getProvinsi()
    this.getKota()
    this.getSekolah()
  },
  mounted() {
    this.isiDulu()
  },
  computed: {
    ...mapGetters('admin', ['sekolah']),
  },
  methods: {
    ...mapActions('admin', ['getSekolah', 'tambahData']),
    isiDulu() {
      this.sekolah.nama !== null ? (this.form.nama = this.sekolah.name) : ''
      this.sekolah.alamat !== null ? (this.form.alamat = this.sekolah.alamat) : ''
      this.sekolah.kecamatan !== null
        ? (this.form.kecamatan = this.sekolah.kecamatan)
        : ''
      this.sekolah.email !== null ? (this.form.email = this.sekolah.email) : ''
      this.sekolah.telepon !== null ? (this.form.telepon = this.sekolah.telepon) : ''
      this.sekolah.provinsi !== null ? (this.form.provinsi = this.sekolah.provinsi) : ''
      this.sekolah.kota !== null ? (this.form.kota = this.sekolah.kota) : ''
    },
    onSave() {
      let data = {
        name: this.form.nama,
        alamat: this.form.alamat,
        kecamatan: this.form.kecamatan,
        email: this.form.email,
        telepon: this.form.telepon,
        provinsi:
          this.form.provinsi != null
            ? this.form.provinsi.label
              ? this.form.provinsi.label
              : this.form.provinsi
            : null,
        kota:
          this.form.kota != null
            ? this.form.kota.label
              ? this.form.kota.label
              : this.form.kota
            : null,
      }
      this.$q.loading.show({ message: 'sending data... please wait...' })
      this.tambahData(data)
        .then(() => {
          this.$q.loading.hide()
          this.$q.loading.show({
            message: 'fething new data... please wait...',
          })
          this.getSekolah()
            .then(() => {
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
    onReset() {
      this.form.nama = null
      this.form.alamat = null
      this.form.email = null
      this.form.telepon = null
      this.form.provinsi = null
      this.form.kota = null
    },
    getProvinsi() {
      this.loadingProv = true
      axios
        .get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then((resp) => {
          let prov = []
          resp.data.provinsi.map(function (value, key) {
            prov.push({
              label: resp.data.provinsi[key].nama,
              value: resp.data.provinsi[key].id,
            })
          })
          this.provinsiOpt = prov
          this.loadingProv = false
        })
        .catch(() => {
          this.loadingProv = false
          this.$q.notify('Error ketika mengambil data')
        })
    },

    getKota(provid) {
      if (this.form.provinsi != null) {
        this.loadingKota = true
        axios
          .get(
            'https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + provid
          )
          .then((resp) => {
            let kota = []
            resp.data.kota_kabupaten.map(function (value, key) {
              kota.push({
                label: resp.data.kota_kabupaten[key].nama,
                value: resp.data.kota_kabupaten[key].id,
              })
            })
            this.kotaOpt = kota
            this.loadingKota = false
          })
          .catch(() => {
            this.loadingKota = false
            this.$q.notify('Error ketika mengambil data')
          })
      }
    },
  },

  watch: {
    'form.provinsi'() {
      if (this.form.provinsi !== undefined) {
        this.getKota(this.form.provinsi.value)
      }
    },
    sekolah() {
      this.isiDulu()
    },
  },
}
</script>
