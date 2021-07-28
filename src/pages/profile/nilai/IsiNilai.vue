<template>
  <q-page>
    <div class="q-pa-lg">
      <q-list v-if="!details" bordered class="q-py-sm">
        <div class="row justify-evenly">
          <div v-for="(type, index) in current_types" :key="index" class="col-5 q-ma-xs">
            <list-type
              :path="
                type.media == undefined
                  ? 'images/no_image.png'
                  : type.media.path == null
                  ? 'images/no_image.png'
                  : storage + type.media.path
              "
              :index="index"
              :id="type.id"
              :label="type.name"
              icon="mdi-note-text-outline"
              @diclick="listListener"
              @besarkan="enlarge = true"
            />
          </div>
        </div>
      </q-list>
      <div v-if="details">
        <div class="row justify-center">
          <div class="col-3">
            <q-responsive :ratio="3 / 4">
              <q-img
                :src="image == null ? 'images/no_image.png' : storage + image"
                no-native-menu
                @click="enlarge = true"
              >
              </q-img>
            </q-responsive>
          </div>
          <div class="col-1">
            <q-file
              class="offset"
              v-model="picture"
              dense
              style="z-index: 99"
              @click="enlarge = false"
            >
              <template v-slot:prepend>
                <q-icon
                  name="mdi-lead-pencil"
                  color="blue"
                  class="absolute all-pointer-events"
                  style="top: 8px; left: 8px"
                />
              </template>
            </q-file>
          </div>
        </div>
        <div v-for="(mapel, index) in nilais" :key="index">
          <input-nilai
            :mapel="mapel"
            :user_id="user.id"
            :type_id="current_type_id"
            @goback="details = false"
          />
        </div>

        <div v-if="current_mapels.length">
          <div class="row">
            <div class="col-5">
              <q-select
                filled
                dense
                options-dense
                v-model="mapel_id"
                label="Mata Pelajaran"
                :options="current_mapels"
                behavior="dialog"
              />
            </div>
            <div class="col-5">
              <q-input v-model="nilai" dense :loading="loading" />
            </div>
            <div class="col-2">
              <q-btn
                :icon="
                  nilai > 0 && mapel_id ? 'mdi-send-outline' : 'mdi-information-outline'
                "
                @click="store"
                :color="nilai > 0 && mapel_id ? 'green' : 'red'"
                dense
                :disable="nilai > 0 && mapel_id ? false : true"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-page-sticky v-if="details" position="top-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="arrow_back" @click="details = false" />
    </q-page-sticky>
    <expand-picture
      :media="
        current_types[current_type_index] != undefined
          ? current_types[current_type_index].media != undefined
            ? current_types[current_type_index].media.path == null
              ? 'images/no_image.png'
              : storage + current_types[current_type_index].media.path
            : 'images/no_image.png'
          : 'images/no_image.png'
      "
      :enlarge="enlarge"
      :mapel="
        current_types[current_type_index] != undefined
          ? current_types[current_type_index].name
          : null
      "
      @tutup="enlarge = false"
    />
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IsiNilai',
  components: {
    'input-nilai': () => import('pages/profile/nilai/InputNilai'),
    'list-type': () => import('pages/profile/nilai/ListType'),
    'expand-picture': () => import('components/shared/ExpandPicture'),
  },
  data() {
    return {
      nilai: 0,
      mapel_id: null,
      details: false,
      image: null,
      picture: null,
      enlarge: false,

      current_type_index: null,
      current_mapels: [],
      current_type_id: null,
      current_types: [],

      loading: false,
    }
  },
  created() {
    this.getType().then(() => {
      if (this.user.id && this.current_type_id) {
        let params = {
          params: {
            user_id: this.user.id,
            type_id: this.current_type_id,
          },
        }
        this.getNilaiBy(params)
      }
      if (this.user.id) {
        let params = {
          params: {
            user_id: this.user.id,
          },
        }
        this.getMediaBy(params)
      }
    })
  },
  computed: {
    ...mapGetters('nilai', ['types', 'nilais', 'mapels', 'medias']),
    ...mapGetters('users', ['user', 'storage']),
  },
  methods: {
    ...mapActions('nilai', ['getType', 'getNilaiBy', 'getMediaBy']),
    mediadannilai() {
      let params = {
        params: {
          user_id: this.user.id,
          type_id: this.current_type_id,
        },
      }
      this.getNilaiBy(params)
      this.getMediaBy(params).then((resp) => {
        console.log(resp)
        if (resp.length) {
          const type = this.types
          let med = resp
          console.log('type', type)
          type.forEach((data) => {
            med.filter((value) => {
              if (data.id == value.type_id) {
                data.media = value
              }
            })
          })
          this.current_types = type
          console.log('type', type)
          if (this.current_types[this.current_type_index]) {
            this.image =
              this.current_types[this.current_type_index].media != undefined
                ? this.current_types[this.current_type_index].media.path
                : null
          }
        } else {
          this.current_types = this.types
        }
      })
    },
    store() {
      let data = {
        user_id: this.user.id,
        mapel_id: this.mapel_id.value,
        type_id: this.current_type_id,
        nilai: this.nilai,
        mapel_name: this.mapel_id.label,
      }
      let params = {
        params: {
          user_id: this.user.id,
          type_id: this.current_type_id,
        },
      }

      let temp_mapel = []
      this.loading = true
      this.$store
        .dispatch('nilai/isiMapel', data)
        .then(() => {
          this.nilai = 0
          this.mapel_id = null
          this.$store.dispatch('users/getUser').then(() => {
            this.$store.dispatch('nilai/getMapels').then(() => {
              this.mapels.forEach((mapel) => {
                if (mapel.type_id == this.types[this.current_type_index].id) {
                  temp_mapel.push(mapel)
                }
              })

              this.getNilaiBy(params).then(() => {
                this.maping(temp_mapel)
                this.details = true
              })
            })
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    listListener(val) {
      this.current_type_index = val.index
      this.current_type_id = val.id

      this.current_mapels = []
      let temp_mapel = []
      this.mapels.forEach((mapel) => {
        if (mapel.type_id == this.types[val.index].id) {
          temp_mapel.push(mapel)
        }
      })

      this.image =
        this.current_types[val.index].media !== undefined
          ? this.current_types[val.index].media.path
          : null

      let params = {
        params: {
          user_id: this.user.id,
          type_id: val.id,
        },
      }
      this.getNilaiBy(params).then(() => {
        this.maping(temp_mapel)
        this.details = true
      })
    },
    maping(temp_mapel) {
      let same = []
      let indexof = []

      temp_mapel.forEach((mapel, inde) => {
        this.nilais.forEach((data, index) => {
          if (mapel.id == data.mapel_id) {
            same.push(mapel)
          }
        })
      })
      same.forEach((data) => {
        indexof.push(temp_mapel.indexOf(data))
        let iof = temp_mapel.indexOf(data)
        temp_mapel.splice(iof, 1)
      })
      this.current_mapels = []
      temp_mapel.map((data) => {
        this.current_mapels.push({
          label: data.name,
          value: data.id,
        })
      })
    },

    upload(file) {
      let data = {
        id:
          this.current_types[this.current_type_index].media != undefined
            ? this.current_types[this.current_type_index].media.id
            : null,
        // id: 8,
        user_id: this.user.id,
        name: this.current_types[this.current_type_index].name,
        type_id: this.current_types[this.current_type_index].id,
      }
      const formData = new FormData()
      formData.append('image', file)
      formData.append('id', data.id)
      formData.append('user_id', data.user_id)
      formData.append('name', data.name)
      formData.append('type_id', data.type_id)

      this.$q.loading.show()

      this.$store
        .dispatch('nilai/uploadImage', formData)
        .then((res) => {
          this.getType().then(() => {
            this.mediadannilai()
          })
          this.$store.dispatch('users/getUser').then(() => {
            this.$store.dispatch('nilai/getMapels')
          })
          this.$q.loading.hide()
          this.picture = null
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

    types() {
      this.mediadannilai()
    },
  },
}
</script>
<style lang="scss" scoped></style>
