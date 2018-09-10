<template>
  <swiper :options="option" v-if="data && data.length">
    <swiper-slide v-for="(item, index) in data" :key="index">
      <router-link class="db col-12" :to="item.url || ''">
        <img class="col-12" :src="item.banner | oss">
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'bannerA',
  props: {
    data: {
      type: Array,
      // default() {
      //   return [{
      //     url: 'https://www.baidu.com',
      //     banner: '//yxclub.oss-cn-hangzhou.aliyuncs.com/cqactivity/snatch/test/banner.jpg',
      //   }];
      // },
    },
  },
  data() {
    return {
      option: {
        autoplay: {
          delay: 3500,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        watchOverflow: true, // 只有1个slide swiper会失效且隐藏导航
      },
    };
  },
  components: {
  },
};
</script>
