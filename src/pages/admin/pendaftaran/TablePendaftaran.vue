<template>
  <div class="row justify-left items-center">
    <q-separator />
    <div class="col-3" @dblclick="enableEditName">
      <span v-if="!editName">
        {{ pendaftaran.name }}
        <q-tooltip> Double click to edit </q-tooltip>
      </span>
      <span v-if="editName">
        <q-input
          ref="nama"
          v-model="name"
          @blur="toEditName"
          @keypress.enter="toEditName"
          label="Nama pendaftaran"
          dense
        />
      </span>
    </div>
    <div class="col-2" @dblclick="enableEditStatus">
      <span v-if="!editStatus">
        {{ pendaftaran.status | status }}
        <q-tooltip> Double click to edit </q-tooltip>
      </span>
      <span v-if="editStatus">
        <q-select
          ref="status"
          @change="toEditStatus"
          @blur="toEditStatus"
          filled
          dense
          options-dense
          v-model="status"
          label="Status"
          :options="statusOpt"
          behavior="dialog"
        />
      </span>
    </div>
    <div class="col-3">{{ pendaftaran.start | tanggal }}</div>
    <div class="col-3">{{ pendaftaran.stop | tanggal }}</div>
    <div class="col-1">
      <q-icon
        v-if="trashed"
        clickable
        name="mdi-delete"
        class="text-red hover"
        style="font-size: 24px"
        @click="confirmHapus"
      />
      <q-icon
        v-if="!trashed"
        clickable
        name="mdi-delete-restore"
        class="text-blue hover"
        style="font-size: 24px"
        @click="confirmRestore"
      />
    </div>
  </div>
</template>
<script>
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import pendaftaran from 'src/store/modules/pendaftaran'
export default {
  name: 'TabelPendaftaran',
  props: ['pendaftaran', 'index', 'trashed'],
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
          label: 'belum Dibuka',
        },
        {
          value: 1,
          label: 'Berlangsung',
        },
        {
          value: 2,
          label: 'Seleksi',
        },
        {
          value: 3,
          label: 'Ditutup',
        },
      ],
    }
  },
  filters: {
    jam(value) {
      return format(new Date(value), 'HH:mm')
    },
    tanggal(value) {
      return format(new Date(value), 'PPPP', { locale: id })
    },
    status(value) {
      let data = ''
      switch (value) {
        case 0:
          data = 'belum dibuka'
          break
        case 1:
          data = 'berlangsung'
          break
        case 2:
          data = 'seleksi'
          break
        case 3:
          data = 'ditutup'
          break
        default:
          data = 'belum ada'
      }
      return data
    },
  },
  mounted() {
    if (this.pendaftaran !== undefined || this.pendaftaran !== null) {
      this.name = this.pendaftaran.name
      this.status = this.pendaftaran.status
      this.start = this.pendaftaran.start
      this.stop = this.pendaftaran.stop
    }
  },
  methods: {
    confirmHapus() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Apakah anda benar benar akan menghapus Pendaftaran ini?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.hapus()
        })
    },
    confirmRestore() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Apakah anda benar benar akan mengembalikan Pendaftaran ini?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.restore()
        })
    },
    hapus() {
      let data = {
        id: this.pendaftaran.id,
      }
      this.hapusPendaftaran(data)
    },
    restore() {
      let data = {
        id: this.pendaftaran.id,
      }
      this.restorePendaftaran(data)
    },
    enableEditName() {
      const vm = this
      if (this.trashed) {
        setTimeout(() => {
          vm.$refs.nama.focus()
        }, 20)
        this.editName = true
      } else {
        this.$q.notify('Tidak di ijinkan mengedit Item terhapus')
      }
    },
    enableEditStatus() {
      const vm = this
      if (this.trashed) {
        setTimeout(() => {
          vm.$refs.status.focus()
        }, 20)
        this.editStatus = true
      } else {
        this.$q.notify('Tidak di ijinkan mengedit Item terhapus')
      }
    },
    toEditName() {
      this.editName = false
      let data = {
        id: this.pendaftaran.id,
        name: this.name,
        status: this.status,
      }
      this.editPendaftaran(data)
    },
    toEditStatus() {
      this.editStatus = false
      let data = {
        id: this.pendaftaran.id,
        name: this.name,
        status: this.status >= 0 ? this.status : this.status.value,
      }
      this.editPendaftaran(data)
    },
    editPendaftaran(data) {
      this.$q.loading.show()
      this.$store
        .dispatch('pendaftaran/editPendaftaran', data)
        .then(() => {
          this.$store
            .dispatch('pendaftaran/getPendaftarans')
            .then(() => {
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    hapusPendaftaran(data) {
      this.$q.loading.show()
      this.$store
        .dispatch('pendaftaran/hapusPendaftaran', data)
        .then(() => {
          this.$store
            .dispatch('pendaftaran/getPendaftarans')
            .then(() => {
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    restorePendaftaran(data) {
      this.$q.loading.show()
      this.$store
        .dispatch('pendaftaran/restorePendaftaran', data)
        .then(() => {
          this.$store
            .dispatch('pendaftaran/getPendaftarans')
            .then(() => {
              this.$emit('aktifkan')
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
  },
  watch: {
    pendaftaran() {
      this.name = this.pendaftaran.name
      this.status = this.pendaftaran.status
      this.start = this.pendaftaran.start
      this.stop = this.pendaftaran.stop
    },
  },
}
</script>
<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
