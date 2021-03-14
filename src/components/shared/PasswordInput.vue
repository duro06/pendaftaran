<template>
  <q-input 
    bottom-slots
    :value="password"
    @input="$emit('update:password', $event)"
    :label="label"
    :type="isPwd ? 'password' : 'text'"
  >
        <template v-slot:prepend>
          <div class="text-blue-4 q-gutter-sm">
            <q-icon :name="icon" />
          </div>
        </template>
        
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
          <q-icon
            v-if="password.length"
            name="close"
            @click="password = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
</template>

<script>
export default {
  props:['password', 'icon', 'label'],
  data(){
    return{
      isPwd:true
    }
  }
}
</script>