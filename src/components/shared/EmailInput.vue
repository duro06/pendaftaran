<template>
  <q-input 
    bottom-slots
    :value="email"
    @input="$emit('update:email', $event)"
    :label="label"
  >
        <template v-slot:prepend>
          <div class="text-blue-4 q-gutter-sm">
            <q-icon :name="icon" />
          </div>
        </template>
        <template v-slot:append>
          <q-icon
            v-if="email.length"
            name="close"
            @click="email = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
</template>

<script>
export default {
  props:['email', 'icon', 'label']
}
</script>