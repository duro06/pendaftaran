<template>
  <div class="hover" @click="perbesar = true">
    <div class="col-2">{{ nama }}</div>
    <div class="col-3">
      <q-responsive :ratio="3 / 4">
        <q-img :src="path" no-native-menu> </q-img>
      </q-responsive>
    </div>

    <Expand :enlarge="perbesar" :media="path" @tutup="perbesar = false" />
  </div>
</template>
<script>
import Expand from 'components/shared/ExpandPicture.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ListBerkas',
  props: ['path', 'nama'],
  components: { Expand },
  data() {
    return {
      perbesar: false,
      media: '',
    }
  },
  computed: {
    ...mapGetters('users', ['storage']),
  },
  methods: {
    ...mapActions('berkas', ['gantiStatus']),
    besarin(value) {
      console.log('value', value)
    },
  },
}
</script>
