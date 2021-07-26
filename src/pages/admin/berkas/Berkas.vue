<template>
  <div class="row justify-left items-center">
    <q-separator />
    <div class="col-3">
      <span>
        {{ berkas.name }}
      </span>
    </div>
    <div class="col-2" @dblclick="enableEditStatus">
      <span v-if="!editStatus">
        {{ berkas.status | status }}
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
    <div class="col-3">{{}}</div>
    <div class="col-3">{{}}</div>
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
export default {
  name: "TabelPendaftaran",
  props: ["berkas", "index", "trashed"],
  data() {
    return {
      editName: false,
      editStatus: false,
      editStart: false,
      editStop: false,
      name: "",
      start: "",
      stop: "",
      status: "",
      statusOpt: [
        {
          value: 0,
          label: "Berkas Masuk",
        },
        {
          value: 1,
          label: "diperiksa",
        },
        {
          value: 2,
          label: "kurang lengkap",
        },
        {
          value: 3,
          label: "tidak diterima",
        },
        {
          value: 4,
          label: "diterima",
        },
      ],
    };
  },
  filters: {
    color(value) {
      let data = "";
      switch (value) {
        case 0:
          data = "teal";
          break;
        case 1:
          data = "blue";
          break;
        case 2:
          data = "lime-12";
          break;
        case 3:
          data = "green";
          break;
        case 4:
          data = "red";
          break;
        default:
          data = "grey";
      }
      return data;
    },
    status(value) {
      let data = "";
      switch (value) {
        case 0:
          data = "berkas masuk";
          break;
        case 1:
          data = "diperiksa";
          break;
        case 2:
          data = "kelengkapan";
          break;
        case 3:
          data = "diterima";
          break;
        case 4:
          data = "tidak diterima";
          break;
        default:
          data = "belum ada";
      }
      return data;
    },
  },
  mounted() {
    if (this.berkas !== undefined || this.berkas !== null) {
      this.name = this.berkas.name;
      this.status = this.berkas.status;
      this.start = this.berkas.start;
      this.stop = this.berkas.stop;
    }
  },
  methods: {
    confirmHapus() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Apakah anda benar benar akan menghapus Pendaftaran ini?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.hapus();
        });
    },
    confirmRestore() {
      this.$q
        .dialog({
          title: "Confirm",
          message:
            "Apakah anda benar benar akan mengembalikan Pendaftaran ini?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.restore();
        });
    },
    hapus() {
      console.log("hapus", this.berkas);
      let data = {
        id: this.berkas.id,
      };
      this.hapusPendaftaran(data);
    },
    restore() {
      console.log("hapus", this.berkas);
      let data = {
        id: this.berkas.id,
      };
      this.restorePendaftaran(data);
    },
    enableEditName() {
      const vm = this;
      if (this.trashed) {
        setTimeout(() => {
          vm.$refs.nama.focus();
        }, 20);
        this.editName = true;
      } else {
        this.$q.notify("Tidak di ijinkan mengedit Item terhapus");
      }
    },
    enableEditStatus() {
      const vm = this;
      if (this.trashed) {
        setTimeout(() => {
          vm.$refs.status.focus();
        }, 20);
        this.editStatus = true;
      } else {
        this.$q.notify("Tidak di ijinkan mengedit Item terhapus");
      }
    },
    toEditName() {
      this.editName = false;
      let data = {
        id: this.berkas.id,
        name: this.name,
        status: this.status,
      };
      console.log("data", data);
      this.editPendaftaran(data);
    },
    toEditStatus() {
      this.editStatus = false;
      let data = {
        id: this.berkas.id,
        name: this.name,
        status: this.status >= 0 ? this.status : this.status.value,
      };
      console.log("data", data);
      this.editPendaftaran(data);
    },
    editPendaftaran(data) {
      this.$q.loading.show();
      this.$store
        .dispatch("berkas/editPendaftaran", data)
        .then(() => {
          this.$store
            .dispatch("berkas/getPendaftarans")
            .then(() => {
              this.$q.loading.hide();
            })
            .catch(() => {
              this.$q.loading.hide();
            });
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    hapusPendaftaran(data) {
      this.$q.loading.show();
      this.$store
        .dispatch("berkas/hapusPendaftaran", data)
        .then(() => {
          this.$store
            .dispatch("berkas/getPendaftarans")
            .then(() => {
              this.$q.loading.hide();
            })
            .catch(() => {
              this.$q.loading.hide();
            });
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    restorePendaftaran(data) {
      this.$q.loading.show();
      this.$store
        .dispatch("berkas/restorePendaftaran", data)
        .then(() => {
          this.$store
            .dispatch("berkas/getPendaftarans")
            .then(() => {
              this.$emit("aktifkan");
              this.$q.loading.hide();
            })
            .catch(() => {
              this.$q.loading.hide();
            });
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
  },
  watch: {
    berkas() {
      this.name = this.berkas.name;
      this.status = this.berkas.status;
      this.start = this.berkas.start;
      this.stop = this.berkas.stop;
    },
  },
};
</script>
<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>