<template>
  <div class="q-ma-sm">
    <div @click="$emit('diclick', { id: id, index: index })">
      <q-card class="my-card">
        <img :src="path" />

        <q-card-section>
          <div class="text-h6">{{ label }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Nilai yang diperoleh dari {{ label }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  props: ["icon", "label", "id", "index", "path"],
};
</script>