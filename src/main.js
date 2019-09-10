import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './plugins/element.js';

Vue.config.productionTip = false;

import 'normalize.css';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
