<template>
  <div>
    <v-list class="py-0">
      <router-link
        v-for="article in articlelist"
        :key="article.time"
        v-ripple
        :to="{ path: `/${article.boardname}/${article.time}` }"
      >
        <v-list-item class="article_item">
          <h2>【{{ article.category }}】{{ article.title }}</h2>

          <h3 v-html="$options.filters.getfirststring(article.content)">
          </h3>
          <p>
            <span>{{ article.time | timestamptodate }}</span>
            <span>{{ article.author |mailfilter }}</span>
            <span v-if="article.res_status">推 {{ article.res_status.push }}</span>
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
};
</script>

<style lang="scss" scoped></style>
