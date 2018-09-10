import Loading from './loading';

export default {
  /**
   * @param {object} Vue
   * @param {object} [pluginOptions] 安装配置
   */
  install(Vue, pluginOptions = {}) {
    const VueLoading = Vue.extend(Loading);
    let loading = null;

    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    function $loading() {
      return new Promise((resolve) => {
        if (!loading) {
          loading = new VueLoading();
          loading.$mount();
          document.querySelector(pluginOptions.container || 'body').appendChild(loading.$el);
        }
        loading.show();
        resolve();
        return true;
      });
    }
    $loading.end = () => new Promise((resolve) => {
      if (!loading || !loading.isShow) {
        resolve();
        return false;
      }
      loading.hide();
      return true;
    });
    /* eslint-disable */
    Vue.prototype.$loading = $loading;
    /* eslint-enable */
  },
};
