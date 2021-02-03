<template>
  <div>
    <v-skeleton-loader
      v-if="articlelist.length===0"
      type="list-item-three-line"
      style="margin: 2vh 3vw;"
    >
    </v-skeleton-loader>
    <v-list class="py-0">
      <router-link
        v-for="article in articlelist"
        :key="article.time"
        v-ripple
        :to="{ path: `/${article.boardname}/${article.time}` }"
      >
        <v-list-item class="article_item">
          <h2>【{{ article.category }}】{{ article.title }}</h2>

          <h3 v-html="$options.filters.getfirststring(article.content)"></h3>
          <p>
            <span>{{ article.time | timestamptodate }}</span>
            <span>{{ article.author | mailfilter }}</span>
            <span v-if="article.article_res">推 {{ push_num(article.article_res) }}</span>
            <span v-if="article.article_res">留言 {{ article.article_res.length }}</span>
          </p>
        </v-list-item>
      </router-link>
    </v-list>
    <router-view />
  </div>
</template>

<script>
export default {
  props: ['articlelist'],
  methods: {
    push_num(articleres) {
      let push = 0;
      articleres.forEach((item) => {
        if (item.res_status === 'push') {
          push += 1;
        }
      });
      return push;
    },
  },
};
</script>

<style lang="scss" scoped></style>
