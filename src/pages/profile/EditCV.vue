<template>
  <q-page>
    <div class="q-pa-lg">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
        <!-- :value="user.email" -->
        <q-input
          filled
          dense
          v-model="form.email"
          label="E-mail *"
          lazy-rules
          readonly
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="eva-email-outline" />
          </template>
        </q-input>

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

        <!-- :value="user.notelp"
        @input="noTelp"-->
        <q-input
          filled
          dense
          v-model="form.notelp"
          label="No Telephone"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="eva-phone-outline" />
          </template>
        </q-input>

        <!-- <q-input
          filled
          v-model="form.nowhatsapp"
          label="No Whatsapp"
          lazy-rules
          ref="wa"
          :rules="[ val => val && val.length > 0 || 'Please type something',
            val => val.substring(0, 2) == 62 || 'dua angka di isi dengan 62'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="fab fa-whatsapp" />
          </template>
        </q-input> -->

        <!-- :value="user.alamat"
        @input="alamat"-->
        <q-input
          v-model="form.alamat"
          filled
          placeholder="Alamat"
          type="textarea"
        />

        <!-- :value="user.provinsi"
        @input="provinsi"-->
        <q-select
          filled
          dense
          options-dense
          v-model="form.provinsi"
          label="Provinsi"
          :options="provinsiOpt"
          behavior="dialog"
        />
        <!-- :value="user.kota"
        @input="kota" -->
        <q-select
          filled
          dense
          options-dense
          v-model="form.kota"
          label="Kota/ Kabupaten"
          :options="kotaOpt"
          behavior="dialog"
        />

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

export default {
  name: "EditProfile",
  created() {
    this.getProvinsi();
    this.getKota();
  },
  mounted() {
    this.isiDulu();
  },
  data() {
    return {
      form: {
        provinsi: null,
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
  },
  methods: {
    isiDulu() {
      if (this.user.email) {
        this.form.email = this.user.email;
      }
      if (this.user.name) {
        this.form.name = this.user.name;
      }
      if (this.user.provinsi) {
        this.form.provinsi = this.user.provinsi;
      }
      if (this.user.kota) {
        this.form.kota = this.user.kota;
      }
      if (this.user.notelp) {
        this.form.notelp = this.user.notelp;
      }
      if (this.user.nowhatsapp) {
        this.form.nowhatsapp = this.user.nowhatsapp;
      }
      if (this.user.alamat) {
        this.form.alamat = this.user.alamat;
      }
      if (this.user.id) {
        this.form.id = this.user.id;
      }
    },
    getProvinsi() {
      axios
        .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
        .then((resp) => {
          let prov = [];
          resp.data.provinsi.map(function (value, key) {
            prov.push({
              label: resp.data.provinsi[key].nama,
              value: resp.data.provinsi[key].id,
            });
          });
          this.provinsiOpt = prov;
        });
    },

    getKota(provid) {
      if (this.form.provinsi != null) {
        axios
          .get(
            "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" +
              provid
          )
          .then((resp) => {
            let kota = [];
            resp.data.kota_kabupaten.map(function (value, key) {
              kota.push({
                label: resp.data.kota_kabupaten[key].nama,
                value: resp.data.kota_kabupaten[key].id,
              });
            });
            this.kotaOpt = kota;
          });
      }
    },
    onSubmit() {
      // console.log(this.form.nowhatsapp.substring(0, 2));
      this.$q.loading.show();
      this.$store
        .dispatch("users/updateProfile", this.form)
        .then((res) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "profile berhasil di update",
            icon: "eva-alert-circle",
          });
        })
        .catch((err) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "profile gagal di update",
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