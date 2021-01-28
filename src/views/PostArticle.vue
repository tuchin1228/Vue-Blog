<template>
  <div class="postpage">
    <div class="postbar">
      <h3>看板</h3>
      <select name="" id="" v-model="postboard">
        <option :value="item.boardname" v-for="item in boardlist" :key="item._id"
          >{{ item.chinese }}({{ item.boardname }})</option
        >
      </select>
    </div>
    <div class="postbar">
      <h3>分類</h3>
      <select name="" id="" v-model="postcategory">
        <option value disabled>選擇分類</option>
        <option :value="item" v-for="item in selectcategory" :key="item">{{ item }}</option>
      </select>
    </div>
    <div class="postbar">
      <h3>作者</h3>
      <h4>{{ Userinfo.email }}</h4>
    </div>
    <div class="postbar">
      <h3>標題</h3>
      <input type="text" v-model="posttitle" />
    </div>
    <div class="postbar">
      <h5>內文</h5>
      <ckeditor
        :config="editorConfig"
        :editor="editor"
        name="contentbox"
        v-model="postcontent"
      ></ckeditor>
    </div>
    <div class="btnbar">
      <v-btn depressed @click="submitArticle">送出</v-btn>
      <v-btn depressed @click="$router.go(-1)">取消</v-btn>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import ClassicEditor from '../ckeditor/ckeditor';

export default {
  computed: {
    boardlist() {
      return this.$store.getters.boardlist;
    },
  },
  data() {
    return {
      selectcategory: [],

      postboard: 'chat',
      postcategory: '',
      posttitle: '',
      postcontent: '',

      Userinfo: {},
      postDetail: {},
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: {
          items: ['link', 'imageUpload', 'mediaEmbed', 'undo', 'redo'],
        },
      },
    };
  },
  watch: {
    boardlist() {
      this.getCategoryArray();
    },
    postboard() {
      this.getCategoryArray();
    },
  },
  created() {
    this.getUserInfo();
    this.$store.dispatch('getBoardList');
  },
  methods: {
    getCategoryArray() {
      const vm = this;
      this.boardlist.forEach((item) => {
        if (item.boardname === this.postboard) {
          vm.selectcategory = item.category;
        }
      });
    },
    getUserInfo() {
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
        vm.Userinfo = {
          id: tokeobj.user_id,
          email: tokeobj.user_email,
          nickname: tokeobj.nickname,
        };
      } else {
        this.$router.go(-1);
      }
    },
    submitArticle() {
      const vm = this;
      let chineseboardname = '';
      // 取得板塊中文名稱
      vm.boardlist.forEach((item) => {
        if (item.boardname === vm.postboard) {
          chineseboardname = item.chinese;
        }
      });
      const detail = {
        title: vm.posttitle,
        author: vm.Userinfo.email,
        authorID: vm.Userinfo.id,
        nickname: vm.Userinfo.nickname,
        content: vm.postcontent,
        boardname: vm.postboard,
        chineseboard: chineseboardname,
        category: vm.postcategory,
        article_res: [],
      };
      console.log(detail);

      this.$store.commit('setLoadingStatus', true);
      this.$http.post(`${process.env.VUE_APP_baseUrl}/postarticle`, detail).then((res) => {
        console.log(res);

        this.$store.commit('setLoadingStatus', false);
        if (res.data.message === 'success') {
          this.$store.dispatch('showalerts', {
            isShow: true,
            type: 'success',
            content: '成功Po文',
          });
          vm.$router.push(`/${vm.postboard}/${res.data.id}`);
        }
      });
    },
  },
};
</script>

<style></style>
