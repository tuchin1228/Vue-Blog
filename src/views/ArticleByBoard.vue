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
    <ArticleList v-if="this.$store.state.ArticleList" :articlelist="article_array" />
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
      nowPage: null,
      all_page: null,
      article_array: [],
    };
  },
  computed: {
    allboard() {
      return this.$store.state.boardlist;
    },

    ArticleLists() {
      return this.$store.state.ArticleList.data;
    },
  },
  created() {
    const { boardname } = this.$route.params;
    this.$store.dispatch('getArticleListByBoard', {
      kind: 'boardname',
      keyword: boardname,
    });
  },
  async mounted() {
    const vm = this;
    // infinite scroll
    // 取得總頁數
    await vm.getAllPages();
    await vm.eventlisten();
  },
  beforeDestroy() {
    const vm = this;
    window.removeEventListener('scroll', vm.getArticles(vm.nowPage));
  },
  watch: {
    $route() {
      this.article_array.length = 0;
      this.getAllPages();
    },
    ArticleLists() {
      if (this.ArticleLists.data === null) {
        this.$router.push('/');
      } else {
        const temparr = [];
        this.ArticleLists.forEach((element) => {
          temparr.unshift(element);
        });
        this.article_array.push(...temparr);
      }
    },
  },
  methods: {
    getAllPages() {
      const vm = this;
      const { boardname } = this.$route.params;
      this.$http
        .get(`${process.env.VUE_APP_baseUrl}/articlelist/boardname/${boardname}/length`)
        .then((res) => {
          vm.all_page = Math.floor(res.data.all_length / 10) * 1 + 1;
          vm.nowPage = 1;
          // // 最新一頁未滿五筆資料在抓一頁
          // if (res.data.all_length % 10 < 5) {
          vm.getArticles(vm.nowPage);
          //   setTimeout(() => {
          //     vm.getArticles(vm.nowPage);
          //   }, 10);
          // } else {
          //   vm.getArticles(vm.all_page);
          // }
        });
    },
    eventlisten() {
      const vm = this;
      window.addEventListener('scroll', () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight
          && this.nowPage <= this.all_page
        ) {
          vm.getArticles(vm.nowPage);
        }
      });
    },
    getArticles(page) {
      // const vm = this;
      const { boardname } = this.$route.params;
      this.$store.dispatch('getArticleListByBoard', {
        kind: 'boardname',
        keyword: boardname,
        page,
      });
      this.nowPage += 1;
    },
  },
};
</script>

<style></style>
