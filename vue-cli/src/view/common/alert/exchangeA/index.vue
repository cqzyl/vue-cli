<template>
  <dialog v-show="value" @click="toHide">
    <div @click.stop class="dialog-main bgfff col-10 pd-s4 lineht-s2r0">
      <h1 class="font-s4r2 tac">兑换确认</h1>
      <ul class="font-s3r8">
        <li class="pd-tb-s1"><span
          class="dib col-5">当前可用积分：</span><var
          class="dib col-7 tac">{{ `${viewData.userIntegral}积分` || '获取中' }}</var></li>
        <li class="pd-tb-s1"><span
          class="dib col-5">每份积分：</span><var
          class="dib col-7 tac">{{ once }}积分</var></li>
        <li class="pd-tb-s1"><span
          class="dib col-5">兑换份额：</span><var
          class="dib col-7 vam"><num-input
          class="font-s6r0"
          :min="nummin"
          :max="nummaxCompute(details)"
          :step="numstep"
          v-model="numValue"/></var></li>
      </ul>
      <footer class="mg-t-s7 tac">
        <input @click="toSubmit" class="btn-3 col-5" type="button" value="确 定 夺 宝" >
      </footer>
    </div>
  </dialog>
</template>

<script>
import { mapActions } from 'vuex';
import numInput from 'common/numInput';

export default {
  name: 'alertExchangeA',
  props: {
    details: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    // 弹窗是否展示
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      numValue: 0,
      nummax: 0,
      viewData: {
        userIntegral: 0,
      },
    };
  },
  computed: {
    // 用户可用积分
    userIntegral() {
      return this.$store.state.user.data;
    },
    // 每份积分
    once() {
      return this.details.once_price || 0;
    },
    nummin() {
      return 0;
    },
    // nummax() {
    //   return this.nummaxCompute(this.details);
    // },
    numstep() {
      return 1;
    },
  },
  methods: {
    ...mapActions({ getData: 'user/getData' }),
    toSubmit() {
      const numValue = this.numValue;

      if (this.viewData.userIntegral && numValue) {
        this.$emit('toSubmit', numValue);
        this.toHide();
      }
    },
    toHide() {
      this.$emit('input', false);
    },
    async getDatas() {
      await this.getData();
      this.viewData.userIntegral = this.userIntegral.point;
    },
    nummaxCompute(details) {
      let res = 0;

      if (details) {
        // 用户已经参与的次数
        const userHad = (details.snatch_participants_number
          && details.snatch_participants_number.participate_number)
          || 0;
        // 用户最大的次数
        const maxpn = details.max_participate_number || 0;

        // 用户剩余可以参与的次数
        const canBy = maxpn - userHad;
        // 用户积分可以购买的次数
        const canIntegralBy = (this.userIntegral.point || 0) / (details.once_price || 1);
        // 商品当前剩余的总可购买次数
        const usersCanBy = details.spell_group_number - details.participate_number;

        res = Math.min(canBy, canIntegralBy, usersCanBy);
      }
      return res;
    },
  },
  components: {
    numInput,
  },
  mounted() {
    this.getDatas();
  },
};
</script>

<style lang="scss" scoped>
  .font-s6r0 {
    font-size: 6.0vw;
  }
</style>
