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
          label="Nama pendaftaran"
          dense
        />
      </span>
    </div>
    <div class="col-3" @dblclick="enableEditStatus">
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
    <div class="col-2">{{ pendaftaran.start | tanggal }}</div>
    <div class="col-2">{{ pendaftaran.stop | tanggal }}</div>
    <div class="col-1">Action</div>
  </div>
</template>
<script>
import { format } from "date-fns";
import { id } from "date-fns/locale";
import pendaftaran from "src/store/modules/pendaftaran";
export default {
  name: "TabelPendaftaran",
  props: ["pendaftaran", "index"],
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
          label: "belum Dibuka",
        },
        {
          value: 1,
          label: "Berlangsung",
        },
        {
          value: 2,
          label: "Seleksi",
        },
        {
          value: 3,
          label: "Ditutup",
        },
      ],
    };
  },
  filters: {
    jam(value) {
      return format(new Date(value), "HH:mm");
    },
    tanggal(value) {
      return format(new Date(value), "PPPP", { locale: id });
    },
    status(value) {
      let data = "";
      switch (value) {
        case 0:
          data = "belum dibuka";
          break;
        case 1:
          data = "berlangsung";
          break;
        case 2:
          data = "seleksi";
          break;
        case 3:
          data = "ditutup";
          break;
        default:
          data = "belum ada";
      }
      return data;
    },
  },
  mounted() {
    if (this.pendaftaran !== undefined || this.pendaftaran !== null) {
      this.name = this.pendaftaran.name;
      this.status = this.pendaftaran.status;
      this.start = this.pendaftaran.start;
      this.stop = this.pendaftaran.stop;
    }
  },
  methods: {
    enableEditName() {
      const vm = this;
      console.log(vm.$refs.nama);
      setTimeout(() => {
        vm.$refs.nama.focus();
      }, 20);
      this.editName = true;
    },
    enableEditStatus() {
      const vm = this;
      console.log(vm.$refs.status);
      setTimeout(() => {
        vm.$refs.status.focus();
      }, 20);
      this.editStatus = true;
    },
    toEditName() {
      this.editName = false;
    },
    toEditStatus() {
      this.editStatus = false;
    },
  },
  watch: {
    pendaftaran() {
      this.name = this.pendaftaran.name;
      this.status = this.pendaftaran.status;
      this.start = this.pendaftaran.start;
      this.stop = this.pendaftaran.stop;
    },
  },
};
</script>