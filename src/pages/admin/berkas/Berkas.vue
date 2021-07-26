<template>
  <div class="q-ma-xs">
    <q-card class="my-card hover" @click="redirect">
      <img
        :src="
          berkas.user.avatar == null ? 'images/nouser.png' : storage + berkas.user.avatar
        "
      />

      <q-card-section>
        <div class="text-h6">{{ berkas.name }}</div>
        <div class="text-caption">
          {{ berkas.user.bio.asal_sekolah }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2">{{ berkas.status | status }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TabelPendaftaran',
  props: ['berkas', 'index', 'trashed'],
  data() {
    return {
      editName: false,
      editStatus: false,
      editStart: false,
      editStop: false,
      name: '',
      start: '',
      stop: '',
      status: '',
      statusOpt: [
        {
          value: 0,
          label: 'Berkas Masuk',
        },
        {
          value: 1,
          label: 'diperiksa',
        },
        {
          value: 2,
          label: 'kurang lengkap',
        },
        {
          value: 3,
          label: 'tidak diterima',
        },
        {
          value: 4,
          label: 'diterima',
        },
      ],
    }
  },
  filters: {
    color(value) {
      let data = ''
      switch (value) {
        case 0:
          data = 'teal'
          break
        case 1:
          data = 'blue'
          break
        case 2:
          data = 'lime-12'
          break
        case 3:
          data = 'green'
          break
        case 4:
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
          data = 'kelengkapan'
          break
        case 3:
          data = 'diterima'
          break
        case 4:
          data = 'tidak diterima'
          break
        default:
          data = 'belum ada'
      }
      return data
    },
  },
  computed: {
    ...mapGetters('users', ['storage']),
  },
  methods: {
    redirect() {
      console.log('slug', this.berkas.id)
      this.$router.replace(
        this.$route.query.redirect || {
          name: 'details.berkas',
          params: { slug: this.berkas.id },
        },
        () => {}
      )
      // this.$route.params.slug
    },
  },
}
</script>
<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
