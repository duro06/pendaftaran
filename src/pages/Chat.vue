<template>
  <q-page ref="chatPage" class="full-height full-width flex column bg-grey-4">
    <!-- header -->
    <q-header elevated>
      <q-toolbar>
        <!-- header -->
        <q-btn
          flat
          round
          dense
          icon="eva-arrow-back-outline"
          v-go-back="{
            name: $route.meta.backto,
            params: { slug: $route.params.slug },
          }"
        />
        <q-avatar
          v-go-back="{
            name: $route.meta.backto,
            params: { slug: $route.params.slug },
          }"
          size="40px"
          color="primary"
          text-color="white"
        >
          <!-- <img :src="urlPath + thumbnail.media" /> -->
        </q-avatar>
        <!-- <div class="text-subtitle2 q-ml-sm">{{ lelang.judul }}</div> -->
        <q-space />
        <!-- <q-btn
            flat
            round
            dense
            icon="whatshot"
            v-go-back="{
                name: $route.meta.backto,
                params: { slug: $route.params.slug },
            }"
            /> -->
      </q-toolbar>

      <q-tabs v-model="tab">
        <q-tab name="forum" label="Forum" />
        <q-tab name="users" label="Users Forum" />
      </q-tabs>
    </q-header>

    <!-- <div ref="infinitescrolltrigger" id="scroll-trigger"></div> -->
    <!-- <div v-if="chattings.length" v-observe-visibility="handleScroll"></div> -->
    <div v-show="tab == 'forum'" class="q-py-md">
      <q-infinite-scroll @load="onLoad" :offset="250" reverse ref="infScroll">
        <div v-for="(tgl, i) in array_tanggal" :key="'tgl' + i">
          <div class="flex flex-center text-center q-ma-sm">
            <div class="tanggalan f-10">{{ tgl }}</div>
          </div>
          <div id="parent" class="column reverse full-width">
            <div
              v-for="(item, n) in filteredItems(tgl)"
              :key="'item' + n"
              :class="[
                user.id === item.user_id || item.user_name === 'me'
                  ? 'self-end'
                  : '',
              ]"
            >
              <div class="q-mb-xs q-mx-xs" @click="handleHold(item.id)">
                <div
                  class="msg_cotainer_send"
                  :class="[
                    user.id === item.user_id || item.user_name === 'me'
                      ? 'self'
                      : 'another',
                    { selected: item.id === isSelected },
                  ]"
                >
                  <div
                    v-if="user.id != item.user_id && item.user_name != 'me'"
                    class="msg_user f-10"
                  >
                    {{ item.user_name }}
                  </div>

                  <div class="column">
                    <span class="" v-if="replyUser(item.message)">
                      <q-input
                        filled
                        dense
                        autogrow
                        :value="item.message | text_reply"
                        class="full-width"
                        label-slot
                      >
                        <template v-slot:label>
                          <div class="row items-center all-pointer-events">
                            <q-icon
                              class="q-mr-xs"
                              color="deep-grey"
                              size="24px"
                              name="eva-corner-up-right-outline"
                            />
                            {{ item.message | user_reply }}
                          </div>
                        </template>
                      </q-input>
                    </span>
                    <span class="msg_text f-14">{{ item.message | msg }}</span>
                  </div>
                  <div class="msg_time row reverse f-10 text-right">
                    <div v-if="item.status == 0">
                      <q-icon name="eva-clock-outline" color="orange" />
                    </div>
                    <div v-else>
                      <q-icon name="eva-done-all" color="orange" size="xs" />
                    </div>
                    <div style="opacity: 0.5" class="q-mr-xs">
                      {{ item.created_at | jam }}
                    </div>
                  </div>
                </div>
                <q-menu ref="dialogRef" touch-position context-menu>
                  <q-item
                    clickable
                    v-ripple
                    v-close-popup
                    @click="balasPesan(item)"
                  >
                    <q-item-section>
                      <div class="row">
                        Balas
                        <span
                          ><q-icon
                            class="q-ml-sm"
                            name="eva-corner-up-right-outline"
                        /></span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Hapus</q-item-section>
                  </q-item>
                </q-menu>
              </div>
            </div>
          </div>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <!-- <div v-show="tab='forum'" class="q-my-md">
                    
        </div> -->

    <div v-show="tab == 'users'">
      <CardUsers :users="users" />
    </div>

    <!-- diakog -->

    <!-- <div class="page-chat q-my-md">
                
                <div v-show="spinn" class="text-center"><q-spinner
                    color="primary"
                    size="3em"
                /></div>
                <div id="parent" class="column reverse full-width">
                    <div v-for="(item, index) in chattings" :key="'item'+index" :class="user.id === item.user_id || item.user_name === 'me' ? 'self-end': ''">
                        <div class="q-mb-xs q-mx-sm" style="max-width:85%">
                            <div class="msg_cotainer_send" :class="user.id === item.user_id || item.user_name === 'me'? 'self': 'another'
                            ">
                                <div v-if="user.id != item.user_id && item.user_name != 'me'" class="msg_user f-10">{{item.user_name}}</div>
                                <span class="msg_text f-14">{{item.message}}</span>
                                <div class="msg_time f-10 text-right">
                                    <span v-if="item.status == 0"><q-icon name="eva-clock-outline" color="blue" /></span>
                                    <span v-else><q-icon name="eva-done-all" color="blue" size="xs" /></span>
                                    {{ item.created_at | jam }}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div> -->

    <!-- footer -->
    <q-footer elevated class="bg-primary">
      <q-toolbar class="bg-grey-2 q-pa-xs" v-show="reply.show">
        <q-input
          filled
          autogrow
          v-model="reply.text"
          class="full-width"
          label-slot
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <q-icon
                class="q-mr-xs"
                color="deep-grey"
                size="24px"
                name="eva-corner-up-right-outline"
              />
              {{ reply.user }}
            </div>
          </template>
          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              icon="eva-close-outline"
              color="black"
              @click="closeReply"
            />
          </template>
        </q-input>
      </q-toolbar>
      <q-toolbar>
        <q-input
          outlined
          autogrow
          v-model="message"
          placeholder="Tulis pesan"
          dense
          style="margin-bottom: 0px !important"
          bg-color="white"
          rounded
          class="full-width"
          ref="inputMessage"
          :loading="loading"
        >
          <template v-slot:after>
            <!-- <q-btn round dense flat icon="add" color="white" @click="bid" /> -->
            <q-btn round dense flat icon="send" color="white" @click="send" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDistanceToNowStrict, isAfter, parseISO, format } from "date-fns";
import { enGB, id } from "date-fns/locale";

import * as axios from "boot/axios";

import CardUsers from "src/components/shared/CardUsers";
export default {
  name: "PageChats",
  components: { CardUsers },
  data() {
    return {
      message: "",
      loading: false,
      tab: "forum",
      page: 1,
      lastPage: 1,
      scrollTarget: void 0,
      // chattings:[],
      spinn: false,

      form: {
        message: "",
        id: null,
        lelang_id: null,
        created_at: null,
        updated_at_at: null,
        user_name: "",
        status: 0,
      },

      isSelected: null,
      reply: {
        show: false,
        text: "",
        user: "",
      },
    };
  },
  created() {
    this.getChat(this.page);
    // this.getLelangById(this.$route.params.slug);
    this.scrollToBottom();
  },
  mounted() {},
  beforeDestroy() {
    this.clearChat();
  },
  filters: {
    ago(value) {
      const formatTgl = parseInt(format(new Date(value), "T"));
      return formatDistanceToNowStrict(formatTgl, { locale: id });
    },
    jam(value) {
      return format(new Date(value), "HH:mm");
    },
    tanggal(value) {
      return format(new Date(value), "PPPP", { locale: id });
    },
    msg(value) {
      // if (value == null || value == undefined) { value = ''}
      let split = value.split("_____");
      return split[0];
    },
    user_reply(value) {
      // if (value == null || value == undefined) { value = ''}
      let split = value.split("_____");
      return split[1];
    },
    text_reply(value) {
      // if (value == null || value == undefined) { value = ''}
      let split = value.split("_____");
      return split[2];
    },
  },
  computed: {
    ...mapGetters("messaging", [
      "progressDone",
      "meta",
      "themporary",
      "chattings",
      "array_tanggal",
      "users",
    ]),
    ...mapGetters("users", ["user", "storage"]),
    // ...mapGetters("lelang", ["lelangById", "lelang", "medias", "nominalBid"]),

    pageCount() {
      return Math.ceil(this.meta.total / this.meta.per_page);
    },

    pageOffset() {
      return this.meta.per_page * this.meta.current_page;
    },
    urlPath() {
      return axios.pathImage();
    },

    // thumbnail() {
    //   let thumb = [];
    //   if (this.lelang.media_lelang !== undefined) {
    //     this.lelang.media_lelang.map((value, key) => {
    //       thumb.push({
    //         media: this.lelang.media_lelang[key].image,
    //         status: this.lelang.media_lelang[key].status,
    //         video: false,
    //       });
    //     });
    //     // this.lelang.video_lelang.map((value, key) => {
    //     //     thumb.push({
    //     //     media: this.lelang.video_lelang[key].video,
    //     //     status: this.lelang.video_lelang[key].status,
    //     //     video: true,
    //     //     });
    //     // });
    //     // console.log("thumb ", thumb[0]);
    //     // let gbr = {}
    //     let go = [];
    //     var where = thumb.filter((obj) => {
    //       return obj.status === 1;
    //     });
    //     if (where.length > 0) {
    //       return where[0];
    //     } else {
    //       return thumb[0];
    //     }
    //   }

    //   // return thumb[0]
    // },
  },
  methods: {
    ...mapActions("messaging", [
      "createChat",
      "getAllChat",
      "clearChat",
      "updateChattings",
      "unshiftChat",
    ]),
    // ...mapActions("lelang", ["getLelangById"]),

    // onScroll(e) {
    //     this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
    // },

    handleHold(val) {},

    balasPesan(item) {
      this.reply.show = !this.reply.show;
      this.reply.text = item.message;
      this.reply.user = item.user_name;
    },
    closeReply() {
      this.reply.show = !this.reply.show;
    },

    replyUser(msg) {
      let split = msg.split("_____");
      // split? split[1]: null
      if (split[1] != null || split[1] != undefined) {
        return true;
      }
      return false;
    },

    filteredItems(val) {
      return this.chattings.filter(
        (c) =>
          format(new Date(c.created_at), "PPPP", { locale: id }).indexOf(val) >
          -1
      );
    },

    onLoad(index, done, setIndex) {
      if (this.tab == "users") {
        done(true);
        return;
      }
      setTimeout(() => {
        if (this.chattings) {
          done();

          this.page = index;
          console.log("onload index", index);

          if (index >= this.meta.last_page) {
            done(true);
          }

          // if (this.meta.current_page == 1) {
          //     this.page=1
          //     setIndex
          // }
        }
      }, 2000);
    },

    getChat(val) {
      this.spinn = true;
      let params = {
        params: {
          // lelang_id: this.$route.params.slug,
          page: val,
        },
      };
      this.getAllChat(params).then(() => {
        this.lastPage = this.meta.last_page;
        this.spinn = false;
      });
    },
    bid() {},
    send() {
      if (this.message == "") {
        this.$refs.inputMessage.focus();
        return;
      }

      var msg;
      if (this.reply.text != "" && this.reply.user != "") {
        msg =
          this.message + "_____" + this.reply.user + "_____" + this.reply.text;
      } else {
        msg = this.message;
      }

      let form = {
        message: msg,
        id: this.$route.params.slug,
        lelang_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        user_name: "me",
        status: 0,
      };
      // console.log('lhoooo',form)
      this.unshiftChat(form);
      this.reply.show = false;

      this.loading = true;
      let data = {
        // lelang_id: this.$route.params.slug,
        message: msg,
      };
      // this.message = "";
      this.createChat(data).then((resp) => {
        console.log("send post", resp);
        this.loading = false;
        this.message = "";
        this.clearForm();
        // this.updateTemporary(1)
      });
      this.scrollToBottom();
    },

    // updateTemporary(val) {
    //     let params = {
    //         params: {
    //             lelang_id: this.$route.params.slug,
    //             page: val
    //         },
    //     };
    //     this.updateChattings(params)
    // },

    clearForm() {
      this.form.message = "";
      this.form.id = null;
      // this.form.lelang_id = null;
      this.form.created_at = null;
      this.form.updated_at = null;
      this.form.user_name = "";
      this.form.status = 0;

      this.reply.text = "";
      this.reply.user = "";
    },

    scrollToBottom() {
      setTimeout(() => {
        let chatPage = this.$refs.chatPage.$el;
        console.log("height ", chatPage.scrollHeight);
        // setTimeout(() => {
        window.scrollTo(0, chatPage.scrollHeight);
        // }, 20);
      }, 20);
    },
  },
  watch: {
    chattings(val) {
      console.log("chattings", val);
      this.scrollToBottom();
    },
    page(val) {
      console.log("page", val);
      if (val == 1) {
        return false;
      }
      this.getChat(this.page);
    },
    meta(val) {
      console.log("watch meta", val.current_page);
      if (val.current_page == 1) {
        this.page = 1;
        if (this.$refs.infScroll !== undefined) {
          this.$refs.infScroll.setIndex(1);
        }
      }
      // return false
    },
    tab(val) {
      console.log("watch tab", val);
      if (val == "users") {
        this.page = 1;
        this.$refs.infScroll.setIndex(1);
      } else {
        this.scrollToBottom();
      }
    },

    // lelang(val) {
    //   console.log("watch lelang", val);
    // },
  },
};
</script>

<style lang="scss" scoped>
#scroll-trigger {
  height: 50px;
}
.full-h {
  height: 100vh !important;
  width: 100vw !important;
}

.self {
  background-color: #b9f0be !important;
}

.another {
  background-color: #fff !important;
}

.msg_cotainer_send {
  box-sizing: content-box;
  border-radius: 8px;

  padding: 4px 8px 3px;
  width: fit-content;

  transition-property: box-shadow, opacity;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  box-shadow: 0 1px 1px -1px rgb(0 0 0 / 10%), 0 1px 1px -1px rgb(0 0 0 / 11%),
    0 1px 2px -1px rgb(0 0 0 / 11%);

  white-space: pre-line;
  margin: initial;
  max-width: 250px;

  .msg_user {
    // padding-right: 10px;
    // white-space: nowrap;
    opacity: 0.5;
  }
  .msg_time {
    // opacity:0.5;
    // margin-right:-5px;
  }
  .msg_text {
    // white-space:pre-wrap;
    // padding-right: 10px;
  }
}

.tanggalan {
  background-color: rgba(142, 190, 231, 0.349);
  padding: 5px 15px;
  border-radius: 5px;
}

.selected {
  background-color: #637164 !important;
}
</style>