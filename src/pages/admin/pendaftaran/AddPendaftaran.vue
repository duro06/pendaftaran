<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row justify-center items-center">
          <div class="text-h6">{{ judul }}</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col-5">Nama {{ namaAdd }}</div>
          <div class="col-7">
            <q-input
              v-model="name"
              label="Label"
              dense
              :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
              lazy-rules
            />
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col-5">Status</div>
          <div class="col-7">
            <q-select
              ref="status"
              filled
              dense
              options-dense
              v-model="status"
              label="Status"
              :options="statusOpt"
              behavior="dialog"
            />
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col-5">Tanggal Mulai</div>
          <div class="col">
            <q-input
              dense
              filled
              v-model="startDate"
              label="Tanggal Mulai"
              @click="showStart"
              :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="mdi-calendar-range" />
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                  ref="qDateStart"
                >
                  <q-date
                    v-model="startDate"
                    mask="YYYY/MM/DD"
                    @input="closeDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        @click="closeStart"
                        label="Close"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col-5">Tanggal Selesai</div>
          <div class="col">
            <q-input
              dense
              filled
              v-model="stopDate"
              label="Tanggal Selesai"
              @click="showDate"
              :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="mdi-calendar-range" />
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                  ref="qDateStop"
                >
                  <q-date
                    v-model="stopDate"
                    mask="YYYY/MM/DD"
                    @input="closeDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        @click="closeDate"
                        label="Close"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" @click="onCancel" />
          <q-btn flat label="Save" color="primary" @click="onSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { date } from "quasar";
import { addDays, parseISO } from "date-fns";
// import { parseISO } from "date-fns/fp";
export default {
  name: "Addtype",
  props: ["confirm", "namaAdd", "judul", "edit", "data"],
  data() {
    return {
      name: "",
      startDate: 0,
      stopDate: 0,
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
  mounted() {
    this.getHariIni();
  },
  methods: {
    onSave() {
      let data = {
        name: this.name,
        start: this.startDate,
        stop: this.stopDate,
        status: this.status.value,
      };
      if (
        this.name != "" &&
        this.startDate != 0 &&
        this.stopDate != 0 &&
        this.status != ""
      ) {
        this.$emit("save", data);
        this.name = "";
        this.status = "";
        this.getHariIni();
      } else {
        this.$q.notify("Lengkapi dahulu data anda");
      }
    },
    onCancel() {
      this.$emit("cancel");
      this.name = "";
    },

    showDate() {
      this.$refs.qDateStop.show();
    },
    closeDate() {
      this.$refs.qDateStop.hide();
      // this.$refs.qTimeProxy.show();
    },
    showStart() {
      this.$refs.qDateStart.show();
    },
    closeStart() {
      this.$refs.qDateStart.hide();
      console.log(this.startDate);
      // this.$refs.qTimeProxy.show();
    },
    getHariIni() {
      let cd = addDays(new Date(), 0);
      let de = addDays(new Date(), 30);

      this.startDate = date.formatDate(cd, "YYYY-MM-DD");
      this.stopDate = date.formatDate(de, "YYYY-MM-DD");
    },
  },
  watch: {
    confirm() {
      this.getHariIni();
    },
    startDate() {
      // let de = addDays(parseISO(this.startDate), 30);
      let de = addDays(new Date(this.startDate), 30);
      this.stopDate = date.formatDate(de, "YYYY-MM-DD");
      console.log("de", de, "stop date", this.stopDate);
    },
  },
};
</script>
<style lang="scss" scoped>
// .row {
// min-width: 350px;
// }
</style>