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
  computed: {
    ...mapGetters('admin', ['sekolah']),
  },
  methods: {
    ...mapActions('admin', ['getSekolah', 'tambahData']),
    isiDulu() {},
    onSave() {
      console.log(this.form)
      if (
        this.form.nama &&
        this.form.alamat &&
        this.form.kecamatan &&
        this.form.email &&
        this.form.telepon &&
        this.form.provinsi &&
        this.form.kota
      ) {
        //anu
      } else {
        this.$q.notify('Data And Belum lengkap')
      }
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
      this.getKota(this.form.provinsi.value)
    },
  },
}
</script>
