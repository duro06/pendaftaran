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
        <div
          class="text-caption"
          v-if="berkas.statusby !== undefined && berkas.statusby !== null"
        >
          oleh: {{ berkas.statusby.name }}
        </div>
        <div
          class="text-right"
          v-if="berkas.statusby !== null || berkas.keterangan !== null"
        >
          <q-btn
            class="text-right"
            no-caps
            size="sm"
            flat
            rounded
            color="grey"
            icon="mdi-update"
            :label="berkas.updated_at | ago"
            disable
          >
            . oleh :
            {{ berkas.keterangan != null ? berkas.keterangan : berkas.statusby.name }}
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatDistanceToNowStrict, format } from 'date-fns'
import { id } from 'date-fns/locale'
export default {
  name: 'Berkas',
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
    ago(value) {
      const formatTgl = parseInt(format(new Date(value), 'T'))
      return formatDistanceToNowStrict(formatTgl, { locale: id }) + '  '
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
    ...mapGetters('users', ['storage']),
  },
  methods: {
    redirect() {
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
