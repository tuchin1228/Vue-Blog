<template>
  <div class="dashboard">
    <!-- <Addboard :userinfo=userinfo /> -->

    <v-card elevation="0">
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>後台管理</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          新增看板
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          文章管理
        </v-tab>

        <v-tab-item>
          <v-card flat class="px-2">
            <Addboard :userinfo="userinfo" :UserId="UserId" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="px-2">
              <ManageArticle :UserId='UserId' />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Addboard from '@/components/AddBoard.vue';
import ManageArticle from '@/components/ManageArticle.vue';

export default {
  components: {
    Addboard, ManageArticle,
  },
  data() {
    return {
      UserId: {},
    };
  },
  computed: {
    userinfo() {
      return this.$store.getters.Userinfo;
    },
  },
  created() {
    this.getUserId();
    this.$store.dispatch('getUserInfo', this.UserId.id);
  },
  methods: {
    getUserId() {
      const vm = this;
      // 解cookie
      const cookies = document.cookie;
      const cookiesObj = cookies
        .split(';')
        .map((ck) => ck.split('='))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value),
          }),
          {},
        );
      if (cookiesObj.kaigangtoken) {
        const tokeobj = jwtDecode(cookiesObj.kaigangtoken);
        vm.UserId = {
          id: tokeobj.user_id,
          email: tokeobj.user_email,
          nickname: tokeobj.nickname,
          role: tokeobj.role,
        };
      }
    },
  },
};
</script>

<style></style>
