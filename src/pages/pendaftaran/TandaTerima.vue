<template>
  <q-page class="q-pa-lg">
    <div class="row justify-center items-center"></div>
    <div class="shadow-up-1">
      <div class="shadow-1">
        <div class="row justify-center">
          <div class="text-h5">Tanda Terima Dokumen Digital</div>
        </div>
        <div class="row justify-center">
          <div class="text-h6">{{ sekolah.name }}</div>
        </div>
        <div class="row justify-center">
          <div class="text-body2">
            {{ sekolah.alamat }}, Kecamatan. {{ sekolah.kecamatan }}, Kabupaten.
            {{ sekolah.kota }}
          </div>
        </div>
        <div class="row justify-center">
          <div class="text-body1">{{ sekolah.provinsi }}</div>
        </div>
        <div class="row justify-center">
          <div class="text-body2">({{ sekolah.telepon }})</div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-ma-lg">
      <div class="text-body2">
        Atas nama, {{ sekolah.name }}. Menerangkan bahwa Kami telah menerima dokumen
        pendaftaran yang dilakukan secara Daring oleh ananda
        <span class="text-weight-bold"> {{ berkas.user.name }}</span> pada,
        <span class="text-weight-bold">{{ berkas.created_at | tanggal }}</span
        >.
      </div>
    </div>
    <div class="row justify-center q-ma-lg">
      <div class="text-body2">
        Demikian Surat ini kami berikan sebagai bukti tertulis untuk dapat digunakan
        dengan sebaik-baiknya.
      </div>
    </div>
    <div class="row justify-end q-ma-lg q-pa-lg">
      <div class="text-body2 text-weight-bold">Team admin</div>
    </div>
  </q-page>
</template>
<script>
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ToPrinted',

  filters: {
    tanggal(value) {
      return value == null
        ? 'belum di isi'
        : format(new Date(value), 'PPPP', { locale: id })
    },
  },
  created() {
    this.getSekolah()
    this.ambilBerkas()
  },
  computed: {
    ...mapGetters('admin', ['sekolah']),
    ...mapGetters('berkas', ['berkas']),
  },
  methods: {
    ...mapActions('admin', ['getSekolah']),
    ...mapActions('berkas', ['getBerkasById']),
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
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
  },
}
</script>
