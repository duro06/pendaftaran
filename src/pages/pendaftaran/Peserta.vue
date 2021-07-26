<template>
  <div class="full-width">
    <div v-for="(item, i) in pesertas" :key="'item' + i">
      <div class="row q-pa-md">
        <div class="avatar q-mr-md">
          <q-avatar size="50px" color="primary" text-color="white">
            <img
              v-if="item.user.avatar != null || item.user.avatar != undefined"
              :src="getAvatar(item.user.avatar)"
            />
            <span v-else>{{ item.name | initial }}</span>
          </q-avatar>
        </div>
        <div class="column">
          <div class="text-subtitle2 q-mt-xs">{{ item.name }}</div>
          <div class="text-caption">{{ item.user.kota }}</div>
        </div>

        <div class="col text-right" v-show="item.id === user.id">
          <div class="q-mt-sm">
            <!-- <q-btn
              no-caps
              outline
              rounded
              color="teal"
              size="sm"
              label="Saya"
            /> -->
            <q-btn
              no-caps
              outline
              rounded
              :color="item.status | color"
              size="sm"
              :label="item.status | status"
            />
          </div>
        </div>
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as axios from 'boot/axios'
export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },

  // created() {
  //   this.getPesertas();
  // },

  filters: {
    initial(value) {
      if (value) {
        return value.substring(0, 1)
      }
      return 'G'
    },
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
    urlPath() {
      return axios.pathImage()
    },

    ...mapGetters('pendaftaran', ['pesertas']),
    ...mapGetters('users', ['user']),
  },
  methods: {
    ...mapActions('pendaftaran', ['getPesertas']),
    getAvatar(avatar) {
      var fields = avatar.split('/')
      var look = fields[0]

      if (look === 'images') {
        return this.urlPath + avatar
      } else {
        return avatar
      }
    },

    getInitial(val) {
      if (val.name) {
        return val.name.substring(0, 1)
      }
      return 'G'
    },
  },
}
</script>

<style lang="scss" scoped></style>
