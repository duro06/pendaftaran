<template>
  <!-- <q-page class="flex flex-center"> -->
  <div class="q-ma-sm">
    <!-- <div class="row justify-evenly"> -->
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
      <!-- </div> -->
    </div>
  </div>
  <!-- </q-page> -->
  <!-- <div>
    <q-separator v-if="index > 0" />
    <q-item clickable v-ripple @click="$emit('diclick', id)">
      <q-item-section avatar>
        <div class="row">
          <q-icon :name="icon" size="25px" />
          <span class="q-ml-sm q-mt-xs f-13">{{ label }}</span>
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label caption></q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <span class="q-ml-sm q-mt-xs f-13"></span>
          <q-icon name="eva-arrow-ios-forward-outline q-mt-xs" size="18px" />
        </div>
      </q-item-section>
    </q-item>
  </div> -->
</template>
<script>
export default {
  name: "List",
  props: ["icon", "label", "id", "index", "path"],
};
</script>