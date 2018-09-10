/**
 * Created by ChenQiang on 2018/8/9.
 */
import Toast from './toast';

export default {
  /**
   * @param {object} Vue
   * @param {object} [pluginOptions] 安装配置
   */
  install(Vue, pluginOptions = {}) {
    const VueToast = Vue.extend(Toast);

    /**
     * 初始化并显示toast
     * @returns {Promise} Promise实例
     */
    function $Toast(msg) {
      return new Promise((resolve) => {
        const toast = new VueToast();
        const parentNode = document.querySelector(pluginOptions.container || 'body');
        toast.$mount();
        toast.message = msg || '提示';
        parentNode.appendChild(toast.$el);

        // to close the Toast at end of show time
        setTimeout(() => {
          parentNode.removeChild(toast.$el);
        }, 3000);
        resolve();
      });
    }
    /* eslint-disable */
    Vue.prototype.$Toast = $Toast;
    /* eslint-enable */
  },
};
