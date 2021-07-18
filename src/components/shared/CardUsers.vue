<template>
  <div class="full-width">
    <div v-for="(item, i) in users" :key="'item' + i">
      <div class="row q-pa-md">
        <div class="avatar q-mr-md">
          <q-avatar size="50px" color="primary" text-color="white">
            <img
              v-if="item.avatar != null || item.avatar != undefined"
              :src="getAvatar(item.avatar)"
            />
            <span v-else>{{ item.name | initial }}</span>
          </q-avatar>
        </div>
        <div class="column">
          <div class="text-subtitle2 q-mt-xs">{{ item.name }}</div>
          <div class="text-caption">{{ item.kota }}</div>
        </div>

        <div class="col text-right" v-show="item.id === user.id">
          <div class="q-mt-sm">
            <q-btn
              no-caps
              outline
              rounded
              color="teal"
              size="sm"
              label="Pelelang"
            />
          </div>
        </div>
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as axios from "boot/axios";
export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.getUsers();
  },

  filters: {
    initial(value) {
      if (value) {
        return value.substring(0, 1);
      }
      return "G";
    },
  },

  computed: {
    urlPath() {
      return axios.pathImage();
    },

    ...mapGetters("messaging", ["user"]),
  },
  methods: {
    ...mapActions("messaging", ["getUsers"]),
    getAvatar(avatar) {
      var fields = avatar.split("/");
      var look = fields[0];

      if (look === "images") {
        return this.urlPath + avatar;
      } else {
        return avatar;
      }
    },

    getInitial(val) {
      if (val.name) {
        return val.name.substring(0, 1);
      }
      return "G";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>