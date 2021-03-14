<template>
  <q-input 
    bottom-slots
    :value="text"
    @input="$emit('update:text', $event)"
    :label="label"
  >
        <template v-slot:prepend>
          <div class="text-blue-4 q-gutter-sm">
            <q-icon :name="icon" />
          </div>
        </template>
        <template v-slot:append>
          <q-icon
            v-if="text.length"
            name="close"
            @click="text = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
</template>

<script>
export default {
  props:['text', 'icon', 'label']
}
</script>