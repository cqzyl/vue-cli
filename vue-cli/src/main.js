// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import App from './App';
import router from './router';
import store from './store';
import Toast from './components/Toast';
import bxAlert from './components/Alert';
import Loading from './components/Loading';
import LoadingOverPage from './components/LoadingOverPage';
import vueLazyloadOptions from './config/vueLazyloadOptions';
import * as bxFilter from './filter';
import * as bxDirective from './directive';
// import dataFilter from './utils/dataFilter';

const isTest = process.env.NODE_ENV === 'development';

// 提示
Vue.use(Toast);

// 弹窗
Vue.use(bxAlert);

// LoadingOverPage
Vue.use(LoadingOverPage);

// loading
Vue.use(Loading);

// 图片懒加载
Vue.use(VueLazyload, vueLazyloadOptions);

// 轮播图
Vue.use(VueAwesomeSwiper);

// 添加过滤器
Object.keys(bxFilter).forEach((key) => {
  Vue.filter(key, bxFilter[key]);
});

// 添加自定义指令
Object.keys(bxDirective).forEach((key) => {
  Vue.directive(key, bxDirective[key]);
});

// ios触发':active'
document.body.addEventListener('touchstart', () => {
}, false);

// global.dataFilter = dataFilter;
// dialog兼容处理
document.createElement('dialog');

Vue.config.productionTip = isTest;

/* eslint-disable no-new */
global.myapp = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
