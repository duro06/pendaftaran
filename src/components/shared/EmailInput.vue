<template>
  <q-input
    bottom-slots
    :value="email"
    @input="$emit('update:email', $event)"
    :label="label"
    :rules="[(val) => !!val || 'Tidak boleh kosong', isValidEmail]"
    ref="email"
    dense
    filled
  >
    <template v-slot:prepend>
      <div class="text-primary q-gutter-sm">
        <q-icon :name="icon" size="sm" color="grey-7" />
      </div>
    </template>
    <template v-slot:append>
      <q-icon
        v-if="email == null ? false : email.length"
        name="close"
        @click="$emit('update:email', '')"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['email', 'icon', 'label'],
  methods: {
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
  },
}
</script>
