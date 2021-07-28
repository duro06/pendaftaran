<template>
  <q-page>
    <div class="q-pa-lg">
      <div class="row justify-center">
        <div class="col-3">
          <q-responsive :ratio="3 / 4">
            <q-img
              :src="user.avatar == null ? 'images/nouser.png' : storage + user.avatar"
              no-native-menu
            >
              <q-file v-model="picture" dense>
                <template v-slot:prepend>
                  <q-icon
                    name="mdi-camera-plus"
                    color="white"
                    class="absolute all-pointer-events"
                    style="top: 8px; left: 8px"
                  />
                </template>
              </q-file>
            </q-img>
          </q-responsive>
        </div>
      </div>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
        <!-- :value="user.name" -->
        <q-input
          filled
          dense
          v-model="form.name"
          label="Name *"
          lazy-rules
          readonly
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account-outline" />
          </template>
        </q-input>
        <q-input
          filled
          dense
          v-model="form.kota"
          label="Tempat Lahir"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-map" />
          </template>
        </q-input>

        <q-input
          dense
          filled
          v-model="form.ttl"
          label="tanggal Lahir"
          @click="showDate"
          :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="mdi-calendar-range" />
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              ref="qDateProxy"
            >
              <q-date v-model="form.ttl" mask="YYYY/MM/DD" @input="closeDate">
                <div class="row items-center justify-end">
                  <q-btn @click="closeDate" label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </template>
        </q-input>

        <q-input
          filled
          dense
          v-model="form.nik"
          type="number"
          label="NIK"
          lazy-rules
          :rules="[(val) => (val && val.length > 15) || 'NIK terdiri dari 16 angka']"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-card-account-details-outline" />
          </template>
        </q-input>

        <q-input
          filled
          dense
          v-model="form.asal_sekolah"
          label="Asal Sekolah"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-school-outline" />
          </template>
        </q-input>

        <div class="row justify-center" v-if="user.role == 'Siswa'">
          <div class="col-4">
            <div class="row justify-center items-center">
              <div class="col items-center">
                <span class="self-center">Kartu Keluarga</span>
              </div>
              <div class="col">
                <q-file v-model="kk" dense>
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-pencil"
                      color="blue"
                      class="absolute all-pointer-events"
                      style="top: 8px; left: 8px"
                    />
                  </template>
                </q-file>
              </div>
            </div>

            <q-responsive @click="enlarge = true" :ratio="16 / 9">
              <q-img
                :src="bio.path == null ? 'images/no_image.png' : storage + bio.path"
                no-native-menu
              >
              </q-img>
            </q-responsive>
          </div>
        </div>
        <q-separator class="q-mt-lg" />
        <div class="q-my-lg">
          <div class="row">
            <div class="col">
              <q-btn no-caps label="Simpan Perubahan" type="submit" color="primary" />
            </div>
            <div class="col">
              <q-btn
                no-caps
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
    <expand-picture
      mapel="Kartu Keluarga"
      :media="bio.path == null ? 'images/no_image.png' : storage + bio.path"
      :enlarge="enlarge"
      @tutup="enlarge = false"
    />
  </q-page>
</template>

<script>
import axios from 'axios'
import * as Axios from 'boot/axios'
import { mapState, mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'
import { addDays } from 'date-fns'

export default {
  name: 'EditCV',
  components: {
    'expand-picture': () => import('components/shared/ExpandPicture'),
  },
  created() {
    // this.getProvinsi();
    this.createBio(this.user.id).then(() => {
      this.$store.dispatch('users/getUser')
    })
  },
  mounted() {
    this.isiDulu()
    // this.getHariIni();
  },
  data() {
    return {
      form: {
        ttl: null,
        nik: null,
        name: null,
        notelp: null,
        asal_sekolah: null,
        alamat: null,
        kota: null,
        id: null,
      },
      provinsiOpt: [],
      kotaOpt: [],
      picture: null,
      kk: null,
      enlarge: false,
    }
  },
  computed: {
    ...mapState('users', ['user']),
    ...mapState('profile', ['bio']),
    ...mapGetters('users', ['storage']),
  },
  methods: {
    ...mapActions('profile', ['createBio']),
    isiDulu() {
      if (this.bio.ttl) {
        this.form.ttl = this.bio.ttl
      }
      if (this.user.name) {
        this.form.name = this.user.name
      }
      if (this.bio.nik) {
        this.form.nik = this.bio.nik
      }
      if (this.bio.asal_sekolah) {
        this.form.asal_sekolah = this.bio.asal_sekolah
      }
      if (this.bio.notelp) {
        this.form.notelp = this.bio.notelp
      }
      if (this.bio.kota) {
        this.form.kota = this.bio.kota
      }
      if (this.bio.alamat) {
        this.form.alamat = this.bio.alamat
      }
      if (this.bio.id) {
        this.form.id = this.bio.id
      }
    },
    // getHariIni() {
    //   let cd = addDays(new Date(), 0);
    //   if (!this.bio.ttl) {
    //     this.form.ttl = date.formatDate(cd, "YYYY-MM-DD");
    //   }
    // },
    showDate() {
      this.$refs.qDateProxy.show()
    },
    closeDate() {
      this.$refs.qDateProxy.hide()
      // this.$refs.qTimeProxy.show();
    },
    onSubmit() {
      this.$q.loading.show()
      this.$store
        .dispatch('profile/updateCV', this.form)
        .then((res) => {
          this.$q.loading.hide()
          this.$q.notify({
            message: 'curriculum vitae berhasil di update',
            icon: 'eva-alert-circle',
          })
        })
        .catch((err) => {
          this.$q.loading.hide()
          this.$q.notify({
            message: 'curriculum vitae gagal di update',
            icon: 'eva-alert-triangle',
          })
        })
    },
    onReset() {
      //   this.form.provinsi = null
      this.form.notelp = null
      this.form.nowhatsapp = null
      this.form.alamat = null
      this.form.kota = null
    },
    upload(file) {
      const formData = new FormData()
      formData.append('image', file)
      let data = {
        id: this.bio.id,
        data: formData,
      }
      this.$q.loading.show()

      this.$store
        .dispatch('users/uploadImage', data)
        .then((res) => {
          this.$q.loading.hide()
        })
        .catch((err) => {
          this.$q.loading.hide()
        })
    },
    uploadKk(file) {
      const formData = new FormData()
      formData.append('image', file)
      let data = {
        id: this.bio.id,
        data: formData,
      }
      this.$q.loading.show()

      this.$store
        .dispatch('profile/uploadImage', data)
        .then((res) => {
          this.$q.loading.hide()
        })
        .catch((err) => {
          this.$q.loading.hide()
        })
    },
  },
  watch: {
    'form.provinsi'() {
      this.getKota(this.form.provinsi.value)
    },
    picture() {
      this.upload(this.picture)
    },
    kk() {
      this.uploadKk(this.kk)
    },
    bio() {
      this.isiDulu()
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-pict {
  width: 250px;
  height: auto;
}
</style>
