<template>
  <div class="addboard">
    <h3>使用者 {{ userinfo.email }}</h3>
    <div class="addboard_boardname">
      <v-text-field label="看板英文名稱*" v-model="newboard.boardname"></v-text-field>
      <v-text-field label="看板中文名稱*" v-model="newboard.chinese"></v-text-field>
    </div>
    <div class="addboard_category">
      <div class="addboard_category_btnbar">
        <v-btn depressed @click="addcategoryLength">新增分類</v-btn>
        <v-btn depressed @click="lesscategoryLength">刪除分類</v-btn>
      </div>
      <div class="addboard_category_input">
        <v-text-field
          v-model="newboard.category[i - 1]"
          :label="'分類' + i"
          v-for="i in categoryLength"
          :key="i"
        ></v-text-field>
      </div>
    </div>
    <div class="addboard_newtitle">
      <span>分類</span>
      <select name="" id="" v-model="article_category">
        <option :value="item" v-for="item in newboard.category" :key="item">{{ item }}</option>
      </select>
      <v-text-field
        label="看板首篇標題*"
        hide-details="auto"
        outlined
        dense
        v-model="article_title"
      ></v-text-field>
    </div>
    <div class="addboard_content">
      <h5>內文</h5>
      <ckeditor
        :config="editorConfig"
        :editor="editor"
        name="contentbox"
        v-model="article_content"
      ></ckeditor>
    </div>
    <div class="addboard_submit">
      <v-btn depressed @click="submit">送出</v-btn>
      <v-btn depressed @click="$router.go(-1)">取消</v-btn>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '../ckeditor/ckeditor';

export default {
  props: ['userinfo', 'UserId'],
  data() {
    return {
      categoryLength: 2,

      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: {
          items: ['link', 'imageUpload', 'mediaEmbed', 'undo', 'redo'],
        },
      },
      newboard: {
        boardname: '',
        chinese: '',
        category: [],
      },
      article_title: '',
      article_category: '',
      article_content: '',
    };
  },
  methods: {
    addcategoryLength() {
      if (this.categoryLength < 6) {
        this.categoryLength += 1;
      }
    },
    lesscategoryLength() {
      if (this.categoryLength > 2) {
        this.categoryLength -= 1;
      }
    },
    submit() {
      const vm = this;
      if (!vm.UserId || vm.UserId.role !== 'admin') {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '權限不足',
        });
      } else {
        const timestamp = Math.floor(Date.now() / 1000);
        const newArticle = {
          boardname: vm.newboard.boardname,
          list: [
            {
              title: vm.article_title,
              author: vm.userinfo.email,
              authorID: vm.userinfo.id,
              nickname: vm.userinfo.nickname,
              content: vm.article_content,
              boardname: vm.newboard.boardname,
              chineseboard: vm.newboard.chinese,
              category: vm.article_category,
              article_res: [],
              page: 1,
              time: timestamp,
            },
          ],
        };

        this.$store.commit('setLoadingStatus', true);
        this.$http
          .post(`${process.env.VUE_APP_baseUrl}/newboard`, { newboard: vm.newboard, newArticle })
          .then((res) => {
            this.$store.commit('setLoadingStatus', false);
            if (res.data.message === 'success') {
              this.$store.dispatch('showalerts', {
                isShow: true,
                type: 'success',
                content: '成功新增看板',
              });
              this.$store.dispatch('getBoardList');
              this.$router.push(`/${vm.newboard.boardname}`);
            }
          });
      }
    },
  },
};
</script>

<style></style>
