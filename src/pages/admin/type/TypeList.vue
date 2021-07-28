<template>
  <div>
    <q-separator v-if="index > 0" />
    <q-item clickable v-ripple @click="mapel">
      <q-item-section avatar>
        <div class="row">
          <q-icon name="mdi-book-check" size="25px" />
          <span class="q-ml-sm q-mt-xs f-13">{{ type.name }}</span>
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label caption></q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <span class="q-ml-sm q-mt-xs f-13"></span>
          <q-icon
            v-if="!mapelDetails"
            name="eva-arrow-ios-forward-outline q-mt-xs"
            size="18px"
          />
          <q-icon
            v-if="mapelDetails"
            name="eva-arrow-ios-downward-outline q-mt-xs"
            size="18px"
          />
        </div>
      </q-item-section>
    </q-item>

    <div v-if="mapelDetails" class="q-pa-md">
      <!-- <q-separator /> -->
      <div class="row justify-center items-center q-mb-md">
        <div class="col">
          <q-btn
            outline
            color="primary"
            icon="mdi-plus"
            dense
            label="Tambah
          Mata Pelajaran"
            no-caps
            @click="showMapel"
          />
        </div>
        <div class="col">
          <q-btn
            color="blue"
            icon="mdi-pencil"
            dense
            label="Edit Tipe Nilai"
            no-caps
            @click="editType"
          />
        </div>
        <div class="col">
          <q-btn
            color="red"
            icon="mdi-delete"
            dense
            label="Hapus Tipe Nilai"
            no-caps
            @click="hapusType"
          />
        </div>
      </div>
      <q-separator />
      <div v-for="(mapel, itu) in type.mapel" :key="itu">
        <div class="row justify-center items-center">
          <div class="col">
            <div class="q-ml-xl q-my-sm">
              {{ mapel.name }}
            </div>
          </div>
          <div class="col-2">
            <!-- <q-btn outline color="blue" icon="mdi-pencil" dense />
            <q-btn outline color="red" icon="mdi-delete" dense /> -->
            <div class="text-right">
              <q-icon
                clickable
                name="mdi-pencil"
                class="text-blue hover"
                style="font-size: 24px"
                @click="edit(mapel)"
              />
              <q-icon
                clickable
                name="mdi-delete"
                class="text-red hover"
                style="font-size: 24px"
                @click="hapus(mapel)"
              />
            </div>
          </div>
        </div>
        <q-separator />
      </div>
    </div>
    <AddType
      :confirm="addDialog"
      namaAdd="mata pelajaran"
      :judul="judul"
      @save="addMapel"
      @cancel="addDialog = false"
    />
    <EditType
      :confirm="editDialog"
      :namaAdd="editName"
      :judul="judul"
      :edit="DataEdit"
      :data="dataReturn"
      :which="which"
      @save="onEdit"
      @cancel="editDialog = false"
    />
  </div>
</template>
<script>
import AddType from 'pages/admin/type/AddType.vue'
import EditType from 'pages/admin/type/EditType.vue'
export default {
  name: 'TypeList',
  components: {
    AddType,
    EditType,
  },
  props: ['type', 'index'],
  data() {
    return {
      mapelDetails: false,
      addDialog: false,
      editDialog: false,
      judul: '',
      DataEdit: '',
      editName: '',
      dataReturn: '',
      which: '',
    }
  },
  methods: {
    confirm(val, label, which) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Apakah anda benar benar akan menghapus ' + label + ' ini?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          if (which == 'mapel') {
            let data = {
              id: val.id,
            }
            // store hapus mapel
            this.$q.loading.show()
            this.$store
              .dispatch('nilai/adminDeleteMapel', data)
              .then(() => {
                this.$store.dispatch('nilai/getType').then(() => {
                  this.$q.loading.hide()
                })
              })
              .catch(() => {
                this.$q.loading.hide()
              })
          } else if (which == 'type') {
            let data = {
              id: val,
            }
            // store hapus type
            this.$q.loading.show()
            this.$store
              .dispatch('nilai/adminDeleteType', data)
              .then(() => {
                this.$store.dispatch('nilai/getType').then(() => {
                  this.$q.loading.hide()
                })
              })
              .catch(() => {
                this.$q.loading.hide()
              })
          } else {
          }
        })
        .onCancel(() => {})
    },
    mapel() {
      this.mapelDetails = !this.mapelDetails
    },
    showMapel() {
      this.addDialog = true
      this.judul = 'Tambah Mata Pelajaran'
    },
    addMapel(val) {
      let data = {
        type_id: this.type.id,
        name: val.name,
      }
      this.$q.loading.show()
      this.$store
        .dispatch('nilai/adminAddMapel', data)
        .then(() => {
          this.$store.dispatch('nilai/getType').then(() => {
            this.$q.loading.hide()
          })
          this.addDialog = false
          this.$q.loading.hide()
        })
        .catch(() => {
          this.addDialog = false
          this.$q.loading.hide()
        })
    },
    onEdit(val) {
      if (val.which == 'mapel') {
        let data = {
          id: val.data.id,
          name: val.name,
        }
        this.$q.loading.show()
        this.$store
          .dispatch('nilai/adminEditMapel', data)
          .then(() => {
            this.$store.dispatch('nilai/getType').then(() => {
              this.$q.loading.hide()
            })
            this.editDialog = false
          })
          .catch(() => {
            this.$q.loading.hide()
            this.editDialog = false
          })
      } else if (val.which == 'type') {
        let data = {
          id: val.data,
          name: val.name,
        }
        this.$q.loading.show()
        this.$store
          .dispatch('nilai/adminEditType', data)
          .then(() => {
            this.$store.dispatch('nilai/getType').then(() => {
              this.$q.loading.hide()
            })
            this.editDialog = false
          })
          .catch(() => {
            this.editDialog = false
            this.$q.loading.hide()
          })
      } else {
        this.editDialog = false
      }
    },
    edit(val) {
      this.editDialog = true
      this.judul = 'Edit Nama Pelajaran'
      this.DataEdit = val.name
      this.dataReturn = val
      this.which = 'mapel'
    },
    hapus(val) {
      this.confirm(val, 'mata pelajaran', 'mapel')
    },
    editType() {
      this.editDialog = true
      this.judul = 'Edit Nama Tipe Nilai'
      this.DataEdit = this.type.name
      this.dataReturn = this.type.id
      this.which = 'type'
    },
    hapusType() {
      this.confirm(this.type.id, 'tipe nilai', 'type')
    },
  },
}
</script>
<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
