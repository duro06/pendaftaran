<template>
  <q-input 
    bottom-slots
    :value="text"
    @input="$emit('update:text', $event)"
    :label="label"
    :rules="[val => !!val && val.length > 6 || 'minimal 6 karakter']"
    ref="text" dense filled
  >
        <template v-slot:prepend>
          <div class="text-primary q-gutter-sm">
            <q-icon :name="icon" color="grey-7" />
          </div>
        </template>
        <template v-slot:append>
          <q-icon
            v-if="text.length"
            name="close"
            @click="$emit('update:text', '')"
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