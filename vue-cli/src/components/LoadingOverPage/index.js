/**
 * Created by Administrator on 2017/12/8.
 */
import LoadingOver from './loadingOverPage';

export default {
  /**
   * @param {object} Vue
   * @param {object} [pluginOptions] 安装配置
   */
  install(Vue, pluginOptions = {}) {
    const VueLoadingOver = Vue.extend(LoadingOver);
    let loadingOver = null;

    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    function $loadingOver() {
      return new Promise((resolve) => {
        if (!loadingOver) {
          loadingOver = new VueLoadingOver();
          loadingOver.$mount();
          document.querySelector(pluginOptions.container || 'body').appendChild(loadingOver.$el);
        }
        loadingOver.show();
        resolve();
      });
    }
    $loadingOver.end = () => new Promise((resolve) => {
      if (!loadingOver || !loadingOver.isShow) {
        resolve();
        return false;
      }
      loadingOver.hide();
      resolve(true);
      return true;
    });
    /* eslint-disable */
    Vue.prototype.$loadingOver = $loadingOver;
  },
};
