<template>
  <div id="app" class="full_size">
    <keep-alive>
      <transition :name="translate.name">
        <router-view/>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import wxshare from '@/utils/wxshare';
import { UserDetail } from '@/api/user';
import { getToken } from '@/utils/cookie';

import '@/assets/css/base.css';
import '@/assets/scss/commongroup.scss';
import '@/assets/scss/common.scss';
import '@/assets/scss/directive.scss';

export default {
  name: 'App',
  data() {
    return {
      translate: {
        name: '',
        fromPath: [],
      },
    };
  },
  methods: {

    // 手机号验证判定
    async verifyMobile() {
      const data = await UserDetail();
      const dataStatus = +data.status;

      // {msg: '用户未绑定手机号', status: 422}
      if (dataStatus === 422 && data.msg && data.msg.indexOf('用户') !== -1) {
        // alert('新用户注册')
        this.mobileVft = true;
      } else if (dataStatus !== 200) {
        // alert('请求出错')
        this.$Toast(data.msg || data.item.msg);
        console.warn('手机号验证请求出错', data);
        return false; // 接口报错  终止执行
      } else if (!data.item.mobile) {
        // alert('旧用户没有绑定手机号')
        this.mobileVft = true;
      } else {
        // alert('已经绑定手机号：', data.item.mobile);
        this.mobileVft = false;
        // this.readyVerify();
      }
      // 手机号验证处理完成
      this.verify = true;

      return true;
    },

    // 页面切换动画
    pageTranslate(to, from) {
      const toPath = to.path;
      const fromPath = from.path;
      const translateFromPath = this.translate.fromPath;

      if (toPath === fromPath) {
        // 用户刷新
      } else if (translateFromPath[translateFromPath.length - 1] === toPath) {
        // 用户返回
        this.translate.name = 'page1-right';
        translateFromPath.pop();
      } else {
        // 用户前进
        this.translate.name = 'page1-left';
        translateFromPath.push(fromPath);
      }
    },

    // 页面title
    titleChange(title) {
      document.title = title || '我的项目';
    },
  },
  mounted() {
    if (getToken()) {
      wxshare();
      this.verifyMobile();
    }
  },
  watch: {
    $route(to, from) {
      // title控制
      this.titleChange(to.meta.title);
      // 页面切换动画控制
      this.pageTranslate(to, from);
    },
  },
};
</script>
