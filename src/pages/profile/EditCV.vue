<template>
  <q-page>
    <div class="q-pa-lg">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
        <!-- :value="user.name" -->
        <q-input
          filled
          dense
          v-model="form.name"
          label="Name *"
          lazy-rules
          readonly
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="eva-person-outline" />
          </template>
        </q-input>

        <q-input
          dense
          filled
          v-model="form.ttl"
          @click="showDate"
          :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              ref="qDateProxy"
            >
              <q-date v-model="form.ttl" mask="YYYY/MM/DD" @input="closeDate">
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

          <!-- <template v-slot:append>
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              ref="qTimeProxy"
            >
              <q-time v-model="form.ttl" mask="YYYY/MM/DD" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </template> -->
        </q-input>

        <q-separator class="q-mt-lg" />
        <div class="q-my-lg">
          <div class="row">
            <div class="col">
              <q-btn
                no-caps
                label="Simpan Perubahan"
                type="submit"
                color="primary"
              />
            </div>
            <div class="col">
              <q-btn
                no-caps
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import * as Axios from "boot/axios";
import { mapState, mapGetters } from "vuex";
import { date } from "quasar";
import { addDays } from "date-fns";

export default {
  name: "EditProfile",
  created() {
    // this.getProvinsi();
    // this.getKota();
  },
  mounted() {
    this.isiDulu();
    this.getHariIni();
  },
  data() {
    return {
      form: {
        ttl: null,
        email: null,
        name: null,
        notelp: null,
        nowhatsapp: null,
        alamat: null,
        kota: null,
        id: null,
      },
      provinsiOpt: [],
      kotaOpt: [],
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("profile", ["bio"]),
  },
  methods: {
    isiDulu() {
      if (this.bio.ttl) {
        this.form.ttl = this.bio.ttl;
      }
      if (this.user.name) {
        this.form.name = this.user.name;
      }
      if (this.bio.provinsi) {
        this.form.provinsi = this.bio.provinsi;
      }
      if (this.bio.kota) {
        this.form.kota = this.bio.kota;
      }
      if (this.bio.notelp) {
        this.form.notelp = this.bio.notelp;
      }
      if (this.bio.nowhatsapp) {
        this.form.nowhatsapp = this.bio.nowhatsapp;
      }
      if (this.bio.alamat) {
        this.form.alamat = this.bio.alamat;
      }
      if (this.bio.id) {
        this.form.id = this.bio.id;
      }
    },
    getHariIni() {
      let cd = addDays(new Date(), 0);
      if (!this.bio.ttl) {
        this.form.ttl = date.formatDate(cd, "YYYY-MM-DD");
      }
    },
    showDate() {
      this.$refs.qDateProxy.show();
    },
    closeDate() {
      this.$refs.qDateProxy.hide();
      // this.$refs.qTimeProxy.show();
    },
    onSubmit() {
      // console.log(this.form.nowhatsapp.substring(0, 2));
      this.$q.loading.show();
      this.$store
        .dispatch("profile/updateCV", this.form)
        .then((res) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "curriculum vitae berhasil di update",
            icon: "eva-alert-circle",
          });
        })
        .catch((err) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "curriculum vitae gagal di update",
            icon: "eva-alert-triangle",
          });
        });
    },
    onReset() {
      //   this.form.provinsi = null
      this.form.notelp = null;
      this.form.nowhatsapp = null;
      this.form.alamat = null;
      this.form.kota = null;
    },
  },
  watch: {
    "form.provinsi"() {
      this.getKota(this.form.provinsi.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>