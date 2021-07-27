<template>
  <q-page class="q-pa-md">
    <q-list bordered class="q-my-md">
      <q-separator />
      <div class="row justify-center items-center">
        <div v-for="(berkas, index) in berkases" :key="index" class="col-3">
          <Berkas :berkas="berkas" :index="index" />
        </div>
      </div>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Berkas from 'pages/admin/berkas/Berkas.vue'
export default {
  name: 'IndexBerkas',
  components: { Berkas },
  data() {
    return {
      addDialog: false,
      trashed: true,
    }
  },
  created() {
    this.getBerkas()
  },
  computed: {
    ...mapGetters('berkas', ['berkases']),
    ...mapGetters('users', ['skeleton']),
  },
  methods: {
    ...mapActions('berkas', ['getBerkas']),
  },
  watch: {},
}
</script>
