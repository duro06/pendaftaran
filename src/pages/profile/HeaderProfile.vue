<template>
  <div>
    <q-card flat square>
      <q-card-section class="bg-primary text-white">
        <div class="flex">
          <div v-if="loggedIn" class="row q-mr-lg">
            <q-btn
              v-if="isLogin"
              round
              size="20px"
              color="grey"
              @click="getFile"
            >
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
              <div class="text-h7">{{ user.kota }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Dialog popup -->
    <!-- <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-file
            color="primary"
            v-model="gambar"
            label="pilih gambar"
            :filter="fileType"
            @rejected="onReject"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup /> 
          <q-btn
            flat
            label="Upload"
            color="primary"
            v-close-popup
            @click="upload"
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
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
import { mapState, mapGetters } from "vuex";
import * as axios from "boot/axios";
import * as ex from "boot/extra";
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
    };
  },
  computed: {
    ...mapGetters("users", ["storage", "loggedIn"]),
    ...mapState("users", ["user"]),
    initial() {
      if (this.user.name) return this.user.name.substring(0, 1);
      else return "G";
    },

    urlPath() {
      return axios.pathImage();
    },
  },
  methods: {
    getAvatar(avatar) {
      var fields = avatar == undefined ? null : avatar.split("/");
      var look = fields == null ? avatar : fields[0];

      if (look === "images") {
        return this.urlPath + avatar;
      } else {
        return avatar;
      }
      // console.log('avatar', look)
    },
    upload(file) {
      // console.log(this.gambar);
      // ex.resizeImage({
      //   file: file[0],
      //   maxSize: 500,
      // })
      //   .then((res) => {
      //     console.log(res);

      const formData = new FormData();
      formData.append("image", file);
      // formData.append("id", this.user.id);
      let data = {
        id: this.user.id,
        data: formData,
      };
      this.$q.loading.show();

      // console.log('aish', this.myImage)

      this.$store
        .dispatch("users/uploadImage", data)
        .then((res) => {
          this.$q.loading.hide();
          console.log("upload", res);
        })
        .catch((err) => {
          this.$q.loading.hide();
          console.log(err);
        });
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },

    fileType(files) {
      return files.filter(
        (file) =>
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
      );
    },
    onReject(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: "Hanya menerima file gambar. (.jpg, .jpeg, .png,)",
        position: "center",
      });
    },

    getFile() {
      this.$refs.myFileInput.$el.click();
    },

    captureImageFallback(file) {
      ex.resizeImage({
        file: file[0],
        maxSize: 500,
      }).then((res) => {
        this.myImage = res;
        this.upload(res);
        // console.log('coba',this.myImage)
      });
    },

    // async upLoadImage(val) {
    //   let image = val;
    //   const formData = new FormData();
    //   formData.append("image", image);
    //   this.$q.loading.show();

    //   try {
    //     const resp = await axios.httpFile().post(
    //       `/me/upload_image`,
    //       formData
    //     );
    //     console.log('avatar', resp)
    //     this.$q.notify({
    //       message: "Avatar Berhasil disimpan",
    //       icon: "eva-alert-circle",
    //     });
    //     // this.getDataActivasi();
    //     this.$q.loading.hide();
    //   } catch (error) {
    //     this.$q.loading.hide();
    //     console.log(error);
    //   }
    // },
  },

  watch: {
    myImage() {
      this.upload(this.myImage);
    },
    user(val) {
      // console.log('watch', val)
      this.getAvatar(val.avatar);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>