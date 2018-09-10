import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import rule from './modules/rule';
import commodity from './modules/commodity';

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    user,
    rule,
    commodity,
  },
  strict: process.env.NODE_ENV !== 'production',
});

export { store as default };
