// user.js
import Vue from 'vue';
import { UserDetail, UserIntegral } from '@/api/user';

const user = {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    setData(state, obj) {
      Object.keys(obj).forEach((key) => {
        state.data[key] = obj[key];
      });
    },
  },
  actions: {
    // 获取数据 1/全部请求
    async getData({ dispatch, state: { data } }, argu) {
      if (argu) {
        await dispatch('getDetail');
        await dispatch('getIntegral');
      }

      if (!data.uid) {
        await dispatch('getDetail');
      }

      if ('totalPoint' in data === false) {
        await dispatch('getIntegral');
      }

      return data;
    },

    // 获取用户信息
    async getDetail({ commit, state: { data } }) {
      const res = await UserDetail();
      if (res.status === 200) {
        commit('setData', res.item);
      } else if (res.msg) {
        Vue.prototype.$Toast(res.msg);
      }
      return data;
    },

    // 获取用户积分
    async getIntegral({ commit, state: { data } }) {
      const res = await UserIntegral();
      if (res.status === 200) {
        commit('setData', res.item.context);
      } else if (res.msg) {
        Vue.prototype.$Toast(res.msg);
      }
      return data;
    },
  },
};

export { user as default };
