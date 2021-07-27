<template>
  <q-input
    bottom-slots
    :value="password"
    @input="$emit('update:password', $event)"
    @keyup.enter="$emit('Enter')"
    :label="label"
    :type="isPwd ? 'password' : 'text'"
    ref="password"
    :rules="[(val) => (val && val.length > 7) || 'minimum 8 character', confirmPass]"
    dense
    filled
  >
    <template v-slot:prepend>
      <div class="text-primary q-gutter-sm">
        <q-icon :name="icon" size="xs" color="grey-7" />
      </div>
    </template>

    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
      <q-icon
        v-if="password ? password.length : false"
        name="close"
        @click="$emit('update:password', '')"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['password', 'icon', 'label', 'sama'],
  data() {
    return {
      isPwd: true,
    }
  },
  watch: {
    sama: {
      handler: 'confirmPass',
    },
  },
  methods: {
    confirmPass(val) {
      if (this.sama) {
        let apem = this.sama === val || 'tidak sama'
        return apem
      }
    },
  },
}
</script>
