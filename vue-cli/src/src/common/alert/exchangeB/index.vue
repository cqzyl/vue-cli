<template>
  <dialog v-show="show">
    <div class="dialog-main bgfff col-10 tac pd-tb-s5 pd-lr-s3 lineht-s1r8">
      <input @click="toHide" type="button" class="pa close-r close-rt">
      <hgroup class="pd-t-s5 pd-b-s3 border-b-dash">
        <h3 class="font-s4r2">请填写详细信息兑换宝贝</h3>
        <h4 class="font-s4r0">认筹券码：{{ data.snatch_code }}</h4>
        <h4 class="font-s4r0">您兑换的商品是{{ data.name }}</h4>
      </hgroup>
      <section class="pd-tb-s3">
        <h3 class="font-s4r2">填写收货地址</h3>
        <ul class="font-s3r8">
          <li class="pd-tb-s2"><span
            class="dib col-4">电话号码</span><span
            class="dib col-8"><input
              class="vam pd-s1r5 border1" type="tel" maxlength="11" placeholder="电话号码"
              v-model="form.mobile"
          ></span></li>
          <li class="pd-tb-s2"><span
            class="dib col-4">收货人</span><span
            class="dib col-8"><input
              class="vam pd-s1r5 border1" type="text" maxlength="50" placeholder="姓名"
              v-model="form.consignee"
          ></span></li>
          <li class="pd-tb-s2"><span
            class="dib col-4">收货地址</span><span
            class="dib col-8 tal clrmain"
            :class="{ grayimg: !form.province_id }" @click="linkageAddress.show = true">{{
              (form.province + form.city + form.area + form.town) || '点击选择地址'
          }}</span></li>
          <li class="pd-tb-s2"><span
            class="dib col-4"></span><span
            class="dib col-8"><input
            v-model="form.address"
              class="vam pd-s1r5 border1" type="text" maxlength="100" placeholder="详细地址"
          ></span></li>
        </ul>
        <div class="tac pd-t-s8">
          <input @click="toSubmit" class="btn-3 col-5" type="button" value="确定">
        </div>
      </section>
    </div>
    <four-level-linkage-address
      :showChose="linkageAddress.show"
      @closeAdressList="closeAdressList"
    />
  </dialog>
</template>

<script>
import FourLevelLinkageAddress from 'common/FourLevelLinkageAddress';
import { SnatchBiddingget } from '@/api/snatchList';
import { phoneExp } from '@/config/regEx';

export default {
  name: 'exchangeB',
  data() {
    return {
      show: false,
      data: {
        snatch_code: '',
        name: '',
      },
      form: {
        mobile: '',
        province: '',
        province_id: '',
        city: '',
        city_id: '',
        area: '',
        area_id: '',
        town: '',
        town_id: '',
        address: '',
        snatch_participants_id: '',
        consignee: '',
      },
      linkageAddress: {
        show: false,
        default: null,
      },
    };
  },
  methods: {
    toShow(options) {
      this.data.snatch_code = options.snatch_code;
      this.data.name = options.name;
      this.form.snatch_participants_id = options.snatch_participants_id;

      this.show = true;
    },
    toHide() {
      this.show = false;
    },
    closeAdressList(data) {
      this.linkageAddress.show = false;
      if (data) {
        this.form.province = data[0].name;
        this.form.province_id = data[0].id;
        this.form.city = data[1].name;
        this.form.city_id = data[1].id;
        this.form.area = data[2].name;
        this.form.area_id = data[2].id;
        if (data[3]) {
          this.form.town = data[3].name;
          this.form.town_id = data[3].id;
        } else {
          this.form.town = '';
          this.form.town_id = '';
        }
      }
    },
    toSubmit() {
      const options = this.form;

      switch ('') {
        case options.mobile:
          this.$Toast('请填写手机号码');
          break;
        case options.province_id || options.city_id || options.area_id:
          this.$Toast('请选择地址');
          break;
        case options.consignee:
          this.$Toast('收货人姓名');
          break;
        case options.snatch_participants_id:
          this.$Toast('用户夺宝参与id参数错误，请刷新重试');
          break;
        case options.address:
          this.$Toast('请填写详细地址');
          break;
        default:
          if (!phoneExp.test(options.mobile)) {
            this.$Toast('请填写正确的手机号码');
          } else {
            this.submitBiddingget();
          }
      }
    },
    async submitBiddingget() {
      const data = await SnatchBiddingget(this.form);

      if (data.msg) {
        this.$Toast(data.msg);
      }

      if (data.status === 200) {
        this.show = false;
      }
    },
  },
  components: {
    FourLevelLinkageAddress,
  },
  mounted() {
    this.$on('toShow', this.toShow);
  },
};
</script>

<style lang="scss" scoped>
.border1 {
  border: 1px solid #333;
  border-radius: 1.3vw;
}
.border-b-dash {
  border-bottom: 1px dashed $mainColor;
}
</style>
