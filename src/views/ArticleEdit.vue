<template>
  <div class="postpage">
    <div class="postbar">
      <h3>看板</h3>
      <h6>{{ ArticleContent.chineseboard }}</h6>
    </div>
    <div class="postbar">
      <h3>分類</h3>
      <select name="" id="" v-model="editobj.editcategory">
        <option :value="item" v-for="item in selectcategory" :key="item">{{ item }}</option>
      </select>
    </div>
    <div class="postbar">
      <h3>作者</h3>
      <h4>{{ AuthorInfo.email }}</h4>
    </div>
    <div class="postbar">
      <h3>標題</h3>
      <input type="text" v-model="editobj.edittitle" />
    </div>
    <div class="postbar">
      <h5>內文</h5>
      <ckeditor
        :config="editorConfig"
        :editor="editor"
        name="contentbox"
        v-model="editobj.editcontent"
      ></ckeditor>
    </div>
    <div class="btnbar">
      <v-btn depressed @click="submitEdit" color="success">確認修改</v-btn>
      <v-btn depressed @click="$router.go(-1)">取消</v-btn>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import ClassicEditor from '../ckeditor/ckeditor';

export default {
  computed: {
    ArticleContent() {
      return this.$store.state.ArticleContent.data;
    },
    AuthorInfo() {
      return this.$store.state.AuthorInfo.data;
    },
    boardlist() {
      return this.$store.getters.boardlist;
    },
  },
  created() {
    this.$store.dispatch('getBoardList');
    this.$store.dispatch('getArticleContent', this.$route.params.time);
  },
  watch: {
    boardlist() {
      this.getCategoryArray();
    },
    ArticleContent() {
      this.editobj.edittitle = this.ArticleContent.title;
      this.editobj.editcategory = this.ArticleContent.category;
      this.editobj.editcontent = this.ArticleContent.content;
    },
  },
  data() {
    return {
      selectcategory: [],

      editobj: {
        editcategory: '',
        edittitle: '',
        editcontent: '',
      },

      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: {
          items: ['link', 'imageUpload', 'mediaEmbed', 'undo', 'redo'],
        },
      },
    };
  },
  methods: {
    getCategoryArray() {
      const vm = this;
      this.boardlist.forEach((item) => {
        if (item.boardname === this.$route.params.boardname) {
          vm.selectcategory = item.category;
        }
      });
    },
    submitEdit() {
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
        if (
          tokeobj.user_id === vm.ArticleContent.authorID
          || tokeobj.user_email === vm.ArticleContent.author
        ) {
          this.$http
            .put(`${process.env.VUE_APP_baseUrl}/editarticle`, {
              boardname: vm.ArticleContent.boardname,
              time: vm.ArticleContent.time,
              editcontent: vm.editobj,
            })
            .then((res) => {
              console.log(res);
              if (res.data.message === 'success') {
                this.$store.dispatch('showalerts', {
                  isShow: true,
                  type: 'success',
                  content: '編輯成功',
                });
                this.$router.push(`/${this.ArticleContent.boardname}/${this.ArticleContent.time}`);
              }
            });
        } else {
          this.$store.dispatch('showalerts', {
            isShow: true,
            type: 'danger',
            content: '權限不足',
          });
        }
      } else {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '權限不足',
        });
      }
    },
  },
};
</script>

<style></style>
