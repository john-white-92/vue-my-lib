import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {
  AppHeader,
  Tabs,
  WrapperPage,
  BookItem,
  Delimiter,
  Sort,
} from './components';

Vue.component('app-header', AppHeader);
Vue.component('tabs', Tabs);
Vue.component('wrapper-page', WrapperPage);
Vue.component('book-item', BookItem);
Vue.component('delimiter', Delimiter);
Vue.component('sort', Sort);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
