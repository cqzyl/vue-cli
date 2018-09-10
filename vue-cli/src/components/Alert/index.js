/**
 * Created by ChenQiang on 2018/8/9.
 */
import bxAlert from './alert';

export default {
  /**
   * @param {object} Vue
   * @param {object} [pluginOptions] 安装配置
   */
  install(Vue, pluginOptions = {}) {
    const VueAlert = Vue.extend(bxAlert);

    /**
     * 初始化并显示alert
     * @returns {Promise} Promise实例
     */
    function $Alert({ title, text }) {
      return new Promise((resolve) => {
        const newBxAlert = new VueAlert();
        const parentNode = document.querySelector(pluginOptions.container || 'body');
        newBxAlert.$mount();

        newBxAlert.show = true;
        newBxAlert.title = title;
        newBxAlert.text = text;
        parentNode.appendChild(newBxAlert.$el);

        // to close the Alert when user close it
        newBxAlert.$once('tohide', () => {
          newBxAlert.show = false;
          newBxAlert.title = '';
          newBxAlert.text = '';
          parentNode.removeChild(newBxAlert.$el);
          resolve();
        });
      });
    }
    /* eslint-disable */
    Vue.prototype.$alert = $Alert;
    /* eslint-enable */
  },
};
