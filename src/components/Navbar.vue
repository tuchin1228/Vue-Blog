<template>
  <div>
    <v-app-bar class="appbar_bg" fixed flat dense dark>
      <div class="appbar_contain">
        <v-btn icon @click="drawer = true">
          <v-icon>
            mdi-format-align-justify
          </v-icon>
        </v-btn>
        <router-link to="/">
          <v-toolbar-title>
            KAIGANG
          </v-toolbar-title>
        </router-link>
        <div class="searchbar">
          <v-text-field
            hide-details
            flat
            dense
            solo
            label="標題搜尋"
            v-model="searchcontent"
            prepend-inner-icon="mdi-magnify"
          />
          <v-btn depressed @click="goSearch">
            搜尋
          </v-btn>
        </div>
        <v-spacer />
        <router-link class="icon_btn" to="/dashboard">
          <v-btn icon>
            <v-icon>
              mdi-view-dashboard
            </v-icon>
          </v-btn>
          <span class="tooltips">後台</span>
        </router-link>
        <router-link class="icon_btn" to="/postarticle">
          <v-btn icon>
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <span class="tooltips">Po文</span>
        </router-link>

        <router-link to="/login" class="icon_btn" v-if="!showSignIn">
          <span style="color:white;font-weight:500;">Login</span>
        </router-link>
        <v-menu offset-y v-if="showSignIn">
          <template #activator="{ on, attrs }">
            <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
              <v-icon color="white">
                mdi-account-circle
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <router-link :to="{ path: `/clientinfo/${tokeninfo.id}` }">
              <v-list-item link>
                <v-list-item-title>
                  個人資料
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item @click="logout">
              <v-list-item-title>
                登出
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary fixed dark class="appbar_drawer">
      <v-list nav dense>
        <h2>看板列表</h2>
        <v-list-item-group v-model="group" active-class="white--text text--accent-4">
          <router-link
            v-for="item in this.$store.state.boardlist"
            :key="item['_id']"
            :to="{ name: 'Home', params: { boardname: item.boardname } }"
          >
            <v-list-item>
              <v-list-item-title>{{ item.chinese }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  data: () => ({
    drawer: false,
    group: null,
    showSignIn: false,
    tokeninfo: {},
    searchcontent: '',
  }),
  created() {
    this.$store.dispatch('getBoardList');
    this.checkOnline();
  },
  computed: {
    // boardlist() {
    //   return this.$store.getters.boardlist.data;
    // },
  },
  watch: {
    $route() {
      this.checkOnline();
    },
  },
  methods: {
    // logout() {
    //   this.$cookiz.remove('kaigangtoken');
    //   this.$router.push('/');
    // },
    checkOnline() {
      const vm = this;
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
        vm.showSignIn = true;
        const tokeobj = jwtDecode(cookiesObj.kaigangtoken);
        console.log('解cookie', tokeobj);
        vm.tokeninfo = {
          id: tokeobj.user_id,
          email: tokeobj.user_email,
          nickname: tokeobj.nickname,
        };
      } else {
        vm.showSignIn = false;
      }
    },
    logout() {
      console.log('登出');
      this.$cookies.remove('kaigangtoken');
      window.location.reload();
    },
    goSearch() {
      this.$router.push(`/search?key=${this.searchcontent}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
