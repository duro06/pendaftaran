<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <div class="row justify-center q-my-lg shadow-1 bg-grey-2">
      <span class="text-h3 text-weight-bold text-center">
        Selamat Datang Di web Pendaftaran {{ sekolah.name }}
      </span>
      <span class="text-body2 text-weight-bold">
        <span class="q-mx-xs">
          {{ sekolah.alamat }}
        </span>
        <span class="q-mx-xs">
          {{ sekolah.kecamatan }}
        </span>
        <span class="q-mx-xs">
          {{ sekolah.kota }}
        </span>
      </span>
    </div>
    <div class="q-gutter-md row items-start q-px-lg q-mx-lg">
      <q-img
        :src="sekolah.path == null ? 'images/no_image.png' : storage + sekolah.path"
        fit="cover"
      >
        <!-- <q-file v-model="picture" dense v-if="user.role == 'Admin'"> -->
        <q-file v-model="picture" dense>
          <template v-slot:prepend>
            <q-icon
              name="mdi-pencil"
              color="blue"
              class="absolute all-pointer-events"
              style="top: 8px; left: 8px"
            />
          </template>
        </q-file>
      </q-img>
      <!-- fit: [ 'cover', 'fill', 'contain', 'none', 'scale-down' ] -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  data() {
    return {
      picture: null,
    }
  },
  created() {
    this.$store.dispatch('admin/getSekolah')
  },
  computed: {
    ...mapGetters('admin', ['sekolah']),
    ...mapGetters('users', ['storage', 'user']),
  },
  methods: {
    routing() {
      this.$router.push({ name: 'berita' })
    },

    upload(file) {
      const formData = new FormData()
      formData.append('image', file)
      let data = {
        id: this.sekolah.id,
        data: formData,
      }
      this.$q.loading.show()
      this.$store
        .dispatch('admin/uploadImage', data)
        .then((res) => {
          this.picture = null
          this.$store
            .dispatch('admin/getSekolah')
            .then(() => {
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
        .catch((err) => {
          this.$q.loading.hide()
        })
    },
  },
  watch: {
    picture() {
      if (this.picture != null) {
        this.upload(this.picture)
      }
    },
  },
}
</script>
