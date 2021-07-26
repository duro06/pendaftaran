<template>
  <q-page class="q-pa-md">
    <q-list bordered class="q-my-md">
      <!-- <div class="row justify-left items-center"> -->
      <!-- <div class="col-3 text-h6">Foto</div> -->
      <!-- <div class="col-8 text-h6 q-ml-sm">status</div> -->
      <!-- <div class="col-3 text-h6">Mulai</div> -->
      <!-- <div class="col-3 text-h6">Berakhir</div> -->
      <!-- <div class="col-2">Action</div> -->
      <!-- </div> -->
      <q-separator />
      <!-- <div class="col-4">
          </div> -->
      <div class="row justify-center items-center">
        <div v-for="(berkas, index) in berkases" :key="index" class="col-3">
          <Berkas :berkas="berkas" :index="index" />
        </div>
      </div>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
import Berkas from "pages/admin/berkas/Berkas.vue";
export default {
  name: "IndexBerkas",
  components: { Berkas },
  data() {
    return {
      addDialog: false,
      trashed: true,
    };
  },
  computed: {
    ...mapGetters("berkas", ["berkases"]),
    ...mapGetters("users", ["skeleton"]),
  },
  methods: {
    onSave(val) {
      this.$q.loading.show();
      this.addDialog = false;
      console.log("Save", val);
      this.$store
        .dispatch("pendaftaran/addPendaftaran", val)
        .then(() => {
          this.$store
            .dispatch("pendaftaran/getPendaftarans")
            .then(() => {
              if (this.trashed == false) {
                this.trashed = true;
              }
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
    getTrashed() {
      console.log("tempat sampah", this.trashed);
      this.$q.loading.show();
      if (!this.trashed) {
        this.$store
          .dispatch("pendaftaran/getTrashedPendaftarans")
          .then(() => {
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      } else {
        this.$store
          .dispatch("pendaftaran/getPendaftarans")
          .then(() => {
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      }
    },
  },
  watch: {
    trashed() {
      this.getTrashed();
    },
  },
};
</script>