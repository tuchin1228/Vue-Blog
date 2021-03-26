import Vue from 'vue';
import VueRouter from 'vue-router';
import ArticleByBoard from '../views/ArticleByBoard.vue';
import Login from '../views/Login.vue';
import ClientInfo from '../views/ClientInfo.vue';
import Search from '../views/search.vue';
import ArticleContent from '../views/ArticleContent.vue';
import PostArticle from '../views/PostArticle.vue';
import ArticleEdit from '../views/ArticleEdit.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/clientinfo',
    redirect: '/chat',
  },
  {
    path: '/clientinfo/:id',
    name: 'clientinfo',
    component: ClientInfo,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/postarticle',
    name: 'PostArticle',
    component: PostArticle,
  },
  {
    path: '/:boardname',
    name: 'Home',
    component: ArticleByBoard,
  },
  {
    path: '/:boardname/:time',
    name: 'ArticleContent',
    component: ArticleContent,
  },
  {
    path: '/:boardname/:time/edit',
    name: 'ArticleEdit',
    component: ArticleEdit,
  },

  {
    path: '/',
    redirect: '/chat',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
