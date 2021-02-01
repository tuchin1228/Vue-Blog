import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import CKEditor from '@ckeditor/ckeditor5-vue';
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';

import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import timestamptodate from './filter/timestamptodate';
import totime from './filter/totime';
import getfirststring from './filter/getfirststring';
import setmedia from './filter/setmedia';
import mailfilter from './filter/mailfilter';

Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(CKEditor);
Vue.filter('timestamptodate', timestamptodate);
Vue.filter('totime', totime);
Vue.filter('getfirststring', getfirststring);
Vue.filter('setmedia', setmedia);
Vue.filter('mailfilter', mailfilter);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
