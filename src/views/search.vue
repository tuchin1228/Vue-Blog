<template>
  <div
    class="ArticleList"
    style="
    box-shadow: 0px 8px 11px #0da6ff9e;"
  >
    <div class="article_title">
      <h2>
        <span>以下為 " {{ this.$route.query.key }} " 搜尋結果</span>
      </h2>
    </div>
    <ArticleList :articlelist="SearchResult" />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue';

export default {
  components: {
    ArticleList,
  },
  data() {
    return {
      SearchResult: [],
    };
  },
  created() {
    this.getSearch();
  },
  watch: {
    $route() {
      this.getSearch();
    },
  },
  methods: {
    getSearch() {
      this.$store.commit('setLoadingStatus', true);
      this.$http.post(`${process.env.VUE_APP_baseUrl}/search`, this.$route.query).then((res) => {
        this.$store.commit('setLoadingStatus', false);
        this.SearchResult = res.data.data;
      });
    },
  },
};
</script>

<style></style>
