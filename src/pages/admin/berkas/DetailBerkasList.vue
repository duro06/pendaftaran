<template>
  <div class="hover row q-ma-sm items-center" @click="perbesar = true">
    <q-card @click="perbesar">
      <div class="text-h6 text-center">{{ nama }}</div>
      <img :src="path" />
    </q-card>
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
    besarin(value) {},
  },
}
</script>
