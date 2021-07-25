<template>
  <div class="q-ma-sm">
    <q-separator v-if="index > 0" />
    <q-item clickable v-ripple @click="details = !details">
      <q-item-section avatar>
        <div class="row">
          <!-- <q-icon :name=".name" size="25px" /> -->
          <span class="q-ml-sm f-13">{{ pendaftaran.name }}</span>
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label caption class="desktop-only"
          ><span
            >{{ pendaftaran.start | tanggal }} -
            {{ pendaftaran.stop | tanggal }}
          </span>
        </q-item-label>
        <q-item-label caption class="mobile-only"
          ><span
            >{{ pendaftaran.start | mobile }} -
            {{ pendaftaran.stop | mobile }}
          </span>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row justify-center">
          <span class="q-ml-sm f-10 text-caption desktop-only" caption
            >{{ pendaftaran.status | status }}
          </span>
          <span class="q-ml-sm f-8 text-caption mobile-only" caption
            >{{ pendaftaran.status | status }}
          </span>
          <q-icon
            v-if="!details"
            class="item-center xxxs"
            name="eva-arrow-ios-forward-outline q-mt-xs"
            size="18px"
          />
          <q-icon
            v-if="details"
            class="item-center xxxs"
            name="eva-arrow-ios-downward-outline q-mt-xs"
            size="18px"
          />
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { format } from "date-fns";
import { id } from "date-fns/locale";
export default {
  name: "pendaftaran",
  props: ["pendaftaran", "index"],
  data() {
    return {
      details: false,
    };
  },
  filters: {
    jam(value) {
      return format(new Date(value), "HH:mm");
    },
    tanggal(value) {
      return format(new Date(value), "PPPP", { locale: id });
    },
    mobile(value) {
      return format(new Date(value), "dd/MM/yy", { locale: id });
    },
    status(value) {
      let data = "";
      switch (value) {
        case 0:
          data = "belum dibuka";
          break;
        case 1:
          data = "berlangsung";
          break;
        case 2:
          data = "seleksi";
          break;
        case 3:
          data = "ditutup";
          break;
        default:
          data = "belum ada";
      }
      return data;
    },
  },
};
</script>
<style lang="scss" scoped>
.my-card {
  height: fit-content;
}
.xxxs {
  margin-top: 2px;
}
</style>