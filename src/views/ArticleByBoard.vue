<template>
  <div
    class="ArticleList"
    style="
    box-shadow: 0px 8px 11px #0da6ff9e;"
  >
    <div class="article_title">
      <h2 v-for="item in allboard" :key="item._id">
        <span v-if="item.boardname === $route.params.boardname"> {{ item.chinese }}</span>
      </h2>
    </div>
    <ArticleList
      v-if="this.$store.state.ArticleList.data"
      :articlelist="this.$store.state.ArticleList.data"
    />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue';

export default {
  components: {
    ArticleList,
  },
  computed: {
    allboard() {
      // const board = this.$store.state.boardlist.map((bd) => bd);
      // const chineseboardname = board.map((bd) => bd.chinese);
      // console.log(chineseboardname);
      return this.$store.state.boardlist;
    },
    ArticleLists() {
      return this.$store.state.ArticleList;
    },
  },
  created() {
    const { boardname } = this.$route.params;
    this.$store.dispatch('getArticleListByBoard', { kind: 'boardname', keyword: boardname });
  },
  watch: {
    $route() {
      const { boardname } = this.$route.params;
      console.log('準備抓', boardname);
      this.$store.dispatch('getArticleListByBoard', { kind: 'boardname', keyword: boardname });
    },
    ArticleLists() {
      console.log('變了', this.ArticleLists);
      if (this.ArticleLists.data === null) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style></style>
