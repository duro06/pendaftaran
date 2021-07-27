<template>
  <div class="q-pa-md">
    <q-list v-if="!gambar" bordered>
      <div v-if="berkas.user" class="row justify-left items-center">
        <div class="col-2">
          <q-responsive :ratio="3 / 4">
            <q-img
              :src="
                berkas.user == undefined
                  ? 'images/nouser.png'
                  : berkas.user.avatar == null
                  ? 'images/nouser.png'
                  : storage + berkas.user.avatar
              "
              no-native-menu
            >
            </q-img>
          </q-responsive>
        </div>
        <div class="col">
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">Nama</div>
            <div class="col">
              {{ berkas.user.name | cek }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">Tempat / tanggal lahir</div>
            <div class="col">
              {{ berkas.user.bio.kabupaten | cek }} /
              {{ berkas.user.bio.ttl | tanggal }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">Alamat</div>
            <div class="col">
              {{ berkas.user.alamat | cek }}, {{ berkas.user.kota | cek }},
              {{ berkas.user.provinsi | cek }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">Nomor Telepon</div>
            <div class="col">
              {{ berkas.user.notelp | cek }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">Email</div>
            <div class="col">
              {{ berkas.user.email | cek }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">NIK</div>
            <div class="col">
              {{ berkas.user.bio.nik | cek }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm">
            <div class="col-2">Asal Sekolah</div>
            <div class="col">
              {{ berkas.user.bio.asal_sekolah | cek }}
            </div>
          </div>
          <q-separator />
          <div class="row q-mx-md q-mt-sm hover" @click="gambar = true">Lihat gambar</div>
        </div>
        <div class="col-2">
          <div v-if="!gantiStatus" class="row justify-center">
            <q-btn
              @click="gantiStatus = true"
              rounded
              outline
              :label="berkas.status | status"
              :color="berkas.status | color"
              no-caps
            />
          </div>
          <div v-if="gantiStatus" class="row justify-center">
            <div class="q-gutter-sm">
              <q-radio v-model="status" val="0" label="Berkas Masuk" />
              <q-radio v-model="status" val="1" label="Diperiksa" />
              <q-radio v-model="status" val="2" label="Tidak Lengkap" />
              <q-radio v-model="status" val="3" label="Lengkap" />
              <q-radio v-model="status" val="4" label="Diterima" />
              <q-radio v-model="status" val="5" label="Tidak Diterima" />
            </div>
            <q-btn
              @click="toGantiStatus"
              rounded
              label="simpan"
              :color="berkas.status | color"
              no-caps
            />
          </div>
        </div>
      </div>
    </q-list>
    <div v-if="gambar" class="q-pa-md q-pt-lg q-mt-lg">
      <div class="row justify-center items-center">
        <div v-for="(item, index) in berkas.media" :key="index" class="col-4">
          <ListBerkas
            :nama="item.name"
            :path="item.path == null ? 'images/no_image.png' : storage + item.path"
          />
        </div>
      </div>
    </div>

    <q-page-sticky v-if="gambar" position="top-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="arrow_back" @click="gambar = false" />
    </q-page-sticky>
  </div>
</template>
<script>
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import ListBerkas from 'pages/admin/berkas/DetailBerkasList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'detailBerkas',
  components: {
    ListBerkas,
  },
  data() {
    return {
      gambar: false,
      gantiStatus: false,
      status: 0,
    }
  },
  created() {
    this.ambilBerkas()
  },
  filters: {
    cek(value) {
      return value == undefined ? 'belum di isi' : value == null ? 'belum di isi' : value
    },
    tanggal(value) {
      return value == null
        ? 'belum di isi'
        : format(new Date(value), 'PPP', { locale: id })
    },
    color(value) {
      let data = ''
      switch (value) {
        case 0:
          data = 'teal'
          break
        case 1:
          data = 'amber'
          break
        case 2:
          data = 'deep-orange'
          break
        case 3:
          data = 'blue'
          break
        case 4:
          data = 'green'
        case 5:
          data = 'red'
          break
        default:
          data = 'grey'
      }
      return data
    },
    status(value) {
      let data = ''
      switch (value) {
        case 0:
          data = 'berkas masuk'
          break
        case 1:
          data = 'diperiksa'
          break
        case 2:
          data = 'tidak lengkap'
          break
        case 3:
          data = 'lengkap'
          break
        case 4:
          data = 'diterima'
          break
        case 5:
          data = 'tidak diterima'
          break
        default:
          data = 'belum ada'
      }
      return data
    },
  },
  computed: {
    ...mapGetters('berkas', ['berkas']),
    ...mapGetters('users', ['storage']),
  },
  methods: {
    ...mapActions('berkas', ['getBerkasById', 'statusChange']),
    toGantiStatus() {
      let data = {
        id: this.$route.params.slug,
        status: this.status,
      }
      this.gantiStatus = false
      console.log('data', data)
      if (this.status != this.berkas.status) {
        this.$q.loading.show({ message: 'sedang menggangti status' })
        this.statusChange(data)
          .then(() => {
            this.$q.loading.hide()
            this.ambilBerkas()
          })
          .catch(() => {
            this.$q.loading.hide()
          })
      }
    },
    ambilBerkas() {
      let params = {
        params: {
          id: this.$route.params.slug,
        },
      }
      this.$q.loading.show({ message: 'Fetcing data... please wait' })
      this.getBerkasById(params)
        .then(() => {
          this.$q.loading.hide()
          setTimeout(() => {
            this.status = this.berkas.status.toString()
          }, 100)
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
