import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import timestamptodate from './filter/timestamptodate';
import totime from './filter/totime';
import getfirststring from './filter/getfirststring';
import setmedia from './filter/setmedia';

Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(CKEditor);
Vue.filter('timestamptodate', timestamptodate);
Vue.filter('totime', totime);
Vue.filter('getfirststring', getfirststring);
Vue.filter('setmedia', setmedia);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
