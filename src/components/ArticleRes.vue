<template>
  <div class="resContent" >
    <h3 class="total" >共 {{ article_res.length }} 則回應</h3>
    <div class="resbox" v-for="(item, index) in article_res" :key="index">
      <div class="resbox_title">
        <v-icon class="pushicon" v-if="item.res_status === 'push'">mdi-thumb-up</v-icon>
        <v-icon class="hateicon" v-if="item.res_status === 'hate'">mdi-thumb-down</v-icon>
        <v-icon class="resicon" v-if="item.res_status === 'res'">mdi-message-text</v-icon>

        <div class="resbox_title_item">
          <h2>{{ item.res_author |mailfilter}}</h2>
          <h3>B{{ index + 1 }} | {{ item.res_time | totime }}</h3>
        </div>
      </div>
      <div class="resbox_content" v-html="item.res_content"></div>
    </div>
    <p class="nores" v-if="article_res.length == 0">立即回覆搶頭香!</p>
  </div>
</template>

<script>
export default {
  props: ['article_res'],
};
</script>

<style></style>
