<template>
  <dialog v-show="display" ref="dialog">
    <div class="dialog-main alert-rule col-10">
      <h2 class="font-s4r0 lineht-s1r8 tac pd-s2">活动规则</h2>
      <div class="pd-s8 pd-t-s10 pd-r-s10">
        <input class="pa close-r font-s3r2" type="button" @click.stop="tohide" value="">
        <ul class="ul-rhombus font-s3r8 lineht-s1r6">
          <li>平台每周选出积分夺宝商品，每期商品以每份50积分进行预购。夺宝结束前，同一件商品可购买多次或一次购买多份；</li>
          <li>成功参与积分夺宝活动后，用户获得唯一夺宝券码，请妥善保管，夺宝开奖以此为准；</li>
          <li>截止活动结束，平台公布商品夺宝情况。若完成夺宝进度，系统将随机抽取幸运券码，拥有对应券码的用户即可获得此商品；若在规定时间内，未完成活动进度，则夺宝失败；</li>
          <li>夺宝成功用户，请于开奖后24小时内至平台进行兑换，逾期失效；</li>
          <li>最终解释权归本香世界所有。</li>
        </ul>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  name: 'alertRule',
  props: {
    // 默认是否展示
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      display: false,
    };
  },
  methods: {
    tohide() {
      this.display = false;
    },
    toShow() {
      this.display = true;
    },
  },
  mounted() {
    this.display = this.show;
    this.$on('toShow', this.toShow);
  },
};
</script>

<style lang="scss" scoped>
  .alert-rule {
    background: url(#{$oss}/common/bg/alert/alertrule.png) no-repeat 0 0 / 100% 100%;
    input {
      top: 15vw;
      right: 5vw;
    }
  }
</style>
