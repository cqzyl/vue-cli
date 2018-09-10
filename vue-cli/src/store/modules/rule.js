// user.js
import Vue from 'vue';
import protocolDetail from '@/api/protocol';

const rule = {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    setRule(state, obj) {
      state.data = obj;
    },
  },
  actions: {
    // 获取数据 1/全部请求
    async getRule({ dispatch, state: { data } }, refresh) {
      if (refresh) {
        await dispatch('getProtocolDetail');
      }

      if (!data.identification) {
        await dispatch('getProtocolDetail');
      }

      return data;
    },

    // 获取积分夺宝规则
    async getProtocolDetail({ commit, state: { data } }) {
      const res = await protocolDetail('2V5ezo3f9B');
      if (res.status === 200) {
        commit('setRule', res.item);
      } else if (res.msg) {
        Vue.prototype.$Toast(res.msg);
      }
      return data;
    },
  },
};

export { rule as default };
