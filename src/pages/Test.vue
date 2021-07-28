<template>
  <div>
    <q-btn color="amber" glossy label="Amber" @click="testMessage" />
  </div>
</template>
<script>
import * as Axios from 'boot/axios'
export default {
  name: 'Test',
  methods: {
    testMessage() {
      this.$q.loading.show({ message: 'dentek luh kang sekejjhek Ok.....' })
      return new Promise((reso, reje) => {
        Axios.http()
          .get('admin/test-fcm')
          .then((res) => {
            this.$q.loading.hide()
          })
          .catch((err) => {
            this.$q.loading.hide()
          })
      })
    },
  },
}
</script>
