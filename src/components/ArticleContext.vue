<template>
  <article class="article_innercontent" v-if="article_content">
    <section class="article_innercontent_btn">
      <v-btn depressed class="blue lighten-1 white--text" @click="$router.go(-1)">
        上一頁
      </v-btn>
      <router-link
        class="white--text"
        :to="{ path: `/${article_content.boardname}/${article_content.time}/edit` }"
        v-if="article_content.authorID === Userinfo.id"
      >
        <v-btn depressed color="success">
          編輯
        </v-btn>
      </router-link>
      <v-btn
        depressed
        color="error"
        @click.stop="deletedialog = true"
        v-if="article_content.authorID === Userinfo.id"
      >
        刪除
      </v-btn>
      <v-dialog v-model="deletedialog" max-width="290">
        <v-card>
          <v-card-title class="headline red accent-2 white--text font-weight-black">
            刪除文章
          </v-card-title>

          <v-card-text class="text-center py-4 text-h6 font-weight-black">
            確認刪除此文?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn class="red--text text--accent-2" text @click="deleteArticle">
              確認
            </v-btn>

            <v-btn class="grey--text " text @click="deletedialog = false">
              取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>
    <section class="content_title">
      <div class="user_avator">
        <img src="@/assets/img/user.png" alt="" v-if="authorInfo.avator == 0" />
        <img :src="authorInfo.avator" alt="" v-else />
      </div>

      <router-link
        :to="{ path: `/clientinfo/${article_content.authorID}` }"
        class="content_title_info"
      >
        <h3>{{ article_content.author }}({{ authorInfo.nickname }})</h3>
        <h4 />
      </router-link>
    </section>
    <section class="content_theme">
      <h1>【{{ article_content.category }}】{{ article_content.title }}</h1>
      <p>
        <span>{{ article_content.chineseboard }}</span> {{ article_content.time | totime }}
      </p>
    </section>
    <section class="article_inner">
      <div v-html="article_content.content"></div>
    </section>
    <section class="article_ResContent">
      <div class="iconbox">
        <v-icon>mdi-thumb-up</v-icon>
        <span>{{ push_num }}</span>
      </div>
      <div class="iconbox">
        <v-icon>mdi-thumb-down</v-icon>
        <span>{{ hate_num }}</span>
      </div>
    </section>
  </article>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  props: ['article_content', 'authorInfo', 'Userinfo'],
  data() {
    return {
      deletedialog: false,
    };
  },
  computed: {
    push_num() {
      let push = 0;
      this.article_content.article_res.forEach((item) => {
        if (item.res_status === 'push') {
          push += 1;
        }
      });
      return push;
    },
    hate_num() {
      let hate = 0;
      this.article_content.article_res.forEach((item) => {
        if (item.res_status === 'hate') {
          hate += 1;
        }
      });
      return hate;
    },
  },
  watch: {
    article_content() {
      this.$nextTick(() => {
        this.setmedia();
      });
    },
  },
  methods: {
    setmedia() {
      document.querySelectorAll('figure.media').forEach((el) => {
        const youtubeID = el.firstChild
          .getAttribute('url')
          .split('/watch?v=')
          .slice(-1)[0];
        const ifr = document.createElement('iframe');
        ifr.setAttribute('src', `https://www.youtube.com/embed/${youtubeID}`);
        ifr.setAttribute('width', '560');
        ifr.setAttribute('height', '315');
        el.appendChild(ifr);
        el.removeChild(el.firstChild);
      });
    },
    deleteArticle() {
      const vm = this;
      vm.deletedialog = false;
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
        if (
          tokeobj.user_id === vm.article_content.authorID
          || tokeobj.user_email === vm.article_content.author
        ) {
          this.$store.commit('setLoadingStatus', true);
          this.$http
            .delete(
              `${process.env.VUE_APP_baseUrl}/deletearticle/${vm.article_content.boardname}/${vm.article_content.time}`,
            )
            .then((res) => {
              // console.log(res);

              this.$store.commit('setLoadingStatus', false);
              if (res.data.message === 'success') {
                this.$store.dispatch('showalerts', {
                  isShow: true,
                  type: 'success',
                  content: '刪除成功',
                });
                vm.$router.push(`/${vm.article_content.boardname}`);
              }
            });
        } else {
          this.$store.dispatch('showalerts', {
            isShow: true,
            type: 'danger',
            content: '權限不足',
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
