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
            <q-input v-model="name" label="Label" dense />
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
export default {
  name: "Addtype",
  props: ["confirm", "namaAdd", "judul", "edit", "data"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSave() {
      let data = {
        name: this.name,
        data: this.data,
      };
      this.$emit("save", data);
      this.name = "";
    },
    onCancel() {
      this.$emit("cancel");
      this.name = "";
    },
  },
  watch: {
    edit() {
      this.name = this.edit;
    },
  },
};
</script>
<style lang="scss" scoped>
.row {
  min-width: 350px;
}
</style>