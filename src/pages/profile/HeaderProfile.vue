<template>
  <div>
    <q-card flat square>
      <q-card-section class="bg-primary text-white">
        <div class="flex">
          <div v-if="loggedIn" class="row q-mr-lg">
            <q-btn v-if="isLogin" round size="20px" color="grey" @click="getFile">
              <q-avatar
                size="78px"
                v-if="user.avatar != null && user.avatar != undefined"
              >
                <q-img
                  :src="user.avatar != undefined ? getAvatar(user.avatar) : ''"
                  style="height: 78px; max-width: 78px"
                />
              </q-avatar>
              <!-- Ini nanti dikasih Initial Orangnya -->
              <q-avatar v-else size="78px">{{ initial }}</q-avatar>
            </q-btn>
            <q-btn v-else size="20px" round color="grey" label>
              <q-avatar size="78px"></q-avatar>
            </q-btn>
          </div>
          <div class="row" v-if="isLogin">
            <div class="column">
              <div class="text-h6" style="margin-bottom: -5px">
                {{ user.name }}
              </div>
              <div class="text-h7">{{ user.email }}</div>
              <div class="text-h7">{{ user.role }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-input
      ref="myFileInput"
      style="display: none"
      v-model="myImage"
      type="file"
      label="Standard"
      accept="image/*"
      @input="captureImageFallback"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import * as axios from 'boot/axios'
import * as ex from 'boot/extra'
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
    adaFoto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      gambar: null,
      myImage: null,
    }
  },
  computed: {
    ...mapGetters('users', ['storage', 'loggedIn', 'user']),
    // ...mapState("users", ["user"]),
    initial() {
      if (this.user.name) return this.user.name.substring(0, 1)
      else return 'G'
    },

    urlPath() {
      return axios.pathImage()
    },
  },
  methods: {
    getAvatar(avatar) {
      var fields = avatar == undefined ? null : avatar.split('/')
      var look = fields == null ? avatar : fields[0]

      if (look === 'images') {
        return this.urlPath + avatar
      } else {
        return avatar
      }
    },
    upload(file) {
      const formData = new FormData()
      formData.append('image', file)
      // formData.append("id", this.user.id);
      let data = {
        id: this.user.id,
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

    fileType(files) {
      return files.filter(
        (file) =>
          file.type === 'image/png' ||
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg'
      )
    },
    onReject(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: 'Hanya menerima file gambar. (.jpg, .jpeg, .png,)',
        position: 'center',
      })
    },

    getFile() {
      this.$refs.myFileInput.$el.click()
    },

    captureImageFallback(file) {
      ex.resizeImage({
        file: file[0],
        maxSize: 500,
      }).then((res) => {
        this.myImage = res
      })
    },
  },

  watch: {
    myImage() {
      this.upload(this.myImage)
    },
    user(val) {
      this.getAvatar(val.avatar)
    },
  },
}
</script>

<style lang="scss" scoped></style>
