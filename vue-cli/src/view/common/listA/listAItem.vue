<template>
  <dl v-if="data" class="pd-t-s1r5">
    <dt class="font-s4r2 tac lineht-s2r0 pd-tb-s1 bgfff">{{ data.name }}</dt>
    <dd
      class="cf bgfff pd-tb-s2 pd-lr-s4 mg-t-s1"
      v-for="(item, index) in data.snatch_goods" :key="index">
      <div class="fl goods-img icon20"><img class="full_size"
        v-imglazy="item.goods.banner[0]"></div>
      <div class="fl col-9 pd-l-s5">
        <h1 class="font-s3r8 text1">{{ item.goods.name }}</h1>
        <div class="pd-tb-s3"><progress-a
          :is-end="theStatus === 3"
          :value="item.participate_number"
          :max="item.spell_group_number"/></div>
        <div>
          <time class="font-s3r2 dib col-8">{{ theTime() }}</time>
          <input class="font-s3r8 btn-2" type="button"
            @click="toSubmit(item)" :value="btnVal(index)">
        </div>
      </div>
    </dd>
  </dl>
</template>

<script>
import progressA from 'common/progressA';
import { getTime, getTimeDays } from '@/utils/times';

/* eslint-disable no-new */
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // 夺宝状态   1 进行中 2/ 即将开始  3/ 已结束
      theStatus: 0,
    };
  },
  computed: {
  },
  methods: {
    // 夺宝状态计算
    theTime() {
      const timeNow = getTime();

      // 夺宝是否开始
      const startVal = getTime(this.data.start_time) - timeNow;
      if (startVal > 0) {
        this.theStatus = 2;

        const { days, hours, minutes } = getTimeDays(startVal);

        return `${days}天${hours}小时${minutes}分钟 后开始`;
      }

      // 夺宝是否结束
      const endVal = getTime(this.data.end_time) - timeNow;
      if (endVal > 0) {
        this.theStatus = 1;

        const { days, hours, minutes } = getTimeDays(endVal);

        return `${days}天${hours}小时${minutes}分钟 后结束`;
      }
      // 夺宝已经结束
      this.theStatus = 3;
      return '已结束';
    },
    a({ days, hours, minutes }) {
      let res = '';
      if (days) {
        res += `${days}天`;
      }
      if (hours) {
        res += `${hours}小时`;
      }
      if (minutes) {
        res += `${minutes}分钟`;
      }
      return res;
    },
    // 点击按钮
    toSubmit(good) {
      this.$emit('toSubmit', { good, status: this.theStatus });
    },
    // 按钮状态
    btnVal(index) {
      const {
        spell_group_number: spellGroupNumber,
        participate_number: participateNumber,
      } = this.data.snatch_goods[index];
      let text = '';

      switch (this.theStatus) {
        // 2/ 即将开始
        case 2:
        case 3:
          text = '点击查看';
          break;
        // case 1:
        default:
          if (spellGroupNumber === participateNumber) {
            text = '查看结果';
          } else {
            text = '点击参与';
          }
      }
      return text;
    },
  },
  components: { progressA },
};
</script>

<style scoped>
  .goods-img {
    background: url(//yxclub.oss-cn-hangzhou.aliyuncs.com/cqactivity/snatch/common/bg/goods.jpg);
  }
</style>
