<template>
  <v-app>
    <Navbar />
    <Loading v-if="isLoading" />
    <Alert />
    <v-main class="ArticleListBg">
      <!-- <HelloWorld/> -->
      <router-view />
    </v-main>

    <!-- <router-view name="ArticleContent" /> -->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Loading from '@/components/Loading.vue';
import Alert from '@/components/Alert.vue';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  components: {
    // HelloWorld,
    Navbar,
    Loading,
    Alert,
  },
  created() {},
  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");
@import url("https://fonts.googleapis.com/earlyaccess/notosanstc.css");
/* @import "@/assets/variables.scss"; */
@import "@/assets/all.scss";
html {
  overflow-x: hidden;
  scroll-behavior: smooth;
}
body {
  margin: 0 0;
  overflow-x: hidden;
  font-size: 1em;
  font-family: "Noto Sans TC", "Arial", sans-serif !important;
}
a {
  text-decoration: none;
}
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  font-weight: 300;
  padding: 0;
  list-style: none;
}
table {
  border-collapse: separate;
  border-spacing: 0;
}

button {
  font-family: "Noto Sans TC", "Arial", sans-serif !important;
}

input {
  font-family: "Noto Sans TC", "Arial", sans-serif !important;
}

.ArticleListBg {
  background: #afe5ff !important;
  padding: 6vh 0 0.5vh 0 !important;
}

.v-application {
  font-family: "Noto Sans TC", "Arial", sans-serif !important;
}
</style>
