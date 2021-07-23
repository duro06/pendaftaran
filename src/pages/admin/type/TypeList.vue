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
      <div class="row justify-center items-center">
        <div class="col">
          <q-btn
            outline
            color="primary"
            icon="mdi-plus"
            dense
            label="Tambah Mata Pelajaran"
            no-caps
            @click="addMapel(index)"
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
            {{ mapel.name }}
          </div>
          <div class="col-2">
            <!-- <q-btn outline color="blue" icon="mdi-pencil" dense />
            <q-btn outline color="red" icon="mdi-delete" dense /> -->
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
        <q-separator />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TypeList",
  props: ["type", "index"],
  data() {
    return { mapelDetails: false };
  },
  methods: {
    confirm(val, label) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Apakah anda benar benar akan menghapus " + label + " ini?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log(">>>> OK", val);
        })
        // .onOk(() => {
        //   console.log(">>>> second OK catcher", val);
        // })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
      // .onDismiss(() => {
      //   console.log("I am triggered on both OK and Cancel", val);
      // });
    },
    mapel() {
      this.mapelDetails = !this.mapelDetails;
    },
    edit(val) {
      console.log("edit", val);
    },
    hapus(val) {
      console.log("delete", val);

      this.confirm(val, "mata pelajaran");
    },
    editType() {
      console.log("edit", this.type.id);
    },
    hapusType() {
      console.log("delete", this.type.id);
      this.confirm(this.type.id, "tipe nilai");
    },
    addMapel(val) {
      console.log("add mapel", this.type.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>