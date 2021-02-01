<template>
  <div class="ArticleContent">
    <ArticleContext
      :authorInfo="AuthorInfo"
      :article_content="this.$store.state.ArticleContent.data"
      :Userinfo="Userinfo"
    />
    <ArticleRes :article_res="ArticleContent.article_res" v-if="ArticleContent" />

    <div class="resbar" :class="{ editor_active: inputIng }">
      <v-card-text class="py-1 px-1">
        <v-btn-toggle class="transparent_bg">
          <v-btn
            @click="res_status = 'res'"
            class="rounded-tl-lg rounded-bl-lg  h_40 "
            :class="
              res_status === 'res' ? 'blue accent-2 white--text' : 'white blue--text text--accent-2'
            "
          >
            回應
          </v-btn>
          <v-btn
            class="h_40"
            @click="res_status = 'push'"
            :class="
              res_status === 'push'
                ? 'blue accent-2 white--text'
                : 'white blue--text text--accent-2'
            "
          >
            推文
          </v-btn>
          <v-btn
            @click="res_status = 'hate'"
            class="rounded-tr-lg rounded-br-lg h_40"
            :class="
              res_status === 'hate'
                ? 'blue accent-2 white--text'
                : 'white blue--text text--accent-2'
            "
          >
            噓文
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
      <ckeditor
        :config="editorConfig"
        :editor="editor"
        name="contentbox"
        v-model="rescontent"
        @focus="inputIng = true"
      ></ckeditor>
      <div class="btnbar" v-if="inputIng == true">
        <v-btn depressed @click="submitRes">送出</v-btn>
        <v-btn depressed @click="inputIng = false">取消</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import ArticleContext from '@/components/ArticleContext.vue';
import ArticleRes from '@/components/ArticleRes.vue';
import ClassicEditor from '../ckeditor/ckeditor';

export default {
  components: {
    ArticleContext,
    ArticleRes,
  },
  computed: {
    ArticleContent() {
      return this.$store.state.ArticleContent.data;
    },
    AuthorInfo() {
      return this.$store.state.AuthorInfo.data;
    },
  },
  watch: {},
  created() {
    this.decodeToken();
    this.$store.dispatch('getArticleContent', this.$route.params.time);
    // this.$store.dispatch('getAuthorInfo', this.$store.state.ArticleContent.data.id);
  },
  data() {
    return {
      Userinfo: {},
      res_status: 'res',
      inputIng: false,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: {
          items: ['link', 'imageUpload', 'mediaEmbed', 'undo', 'redo'],
        },
      },
      rescontent: '',
    };
  },
  methods: {
    onFocus() {
      this.inputIng = true;
    },
    decodeToken() {
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
        const tokeobj = jwtDecode(cookiesObj.kaigangtoken);
        vm.Userinfo = {
          id: tokeobj.user_id,
          email: tokeobj.user_email,
          nickname: tokeobj.nickname,
        };
      }
    },
    submitRes() {
      const vm = this;
      if (!vm.Userinfo.email) {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '尚未登入',
        });
      } else if (vm.rescontent === '') {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '未輸入內文',
        });
      } else {
        const timestamp = Math.floor(Date.now() / 1000);
        const resObj = {
          res_author: vm.Userinfo.email,
          res_status: vm.res_status,
          res_time: timestamp,
          res_content: vm.rescontent,
        };
        this.$store.commit('setLoadingStatus', true);
        this.$http
          .post(
            `${process.env.VUE_APP_baseUrl}/postrescontent/${vm.ArticleContent.boardname}/${vm.ArticleContent.time}`,
            resObj,
          )
          .then((res) => {
            this.$store.commit('setLoadingStatus', false);
            if (res.data.message === 'success') {
              vm.rescontent = '';
              vm.inputIng = false;
              this.$store.dispatch('getArticleContent', this.$route.params.time);
              // this.$router.push(`/${vm.ArticleContent.boardname}/${vm.ArticleContent.time}`);
            }
          });
      }
    },
  },
};
</script>

<style></style>
