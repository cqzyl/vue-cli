/**
 * Created by Administrator on 2018/3/6.
 */
import getAddressList from '@/api/addressList';
import ldsrc from './ld.svg';

export default {
  name: 'FourLevelLinkageAddress',
  props: {
    // 是否显示插件
    showChose: {
      type: Boolean,
      default: true,
    },
    /*
    * 默认地址 不存在则不传 格式：。。。
    * [
    *  {//省 0
    *    id: 0,
    *    name: '省'
    *  },{// 市 1
    *    id: 1,
    *    name: '市'
    *  },{// 区 2
    *    id: 2,
    *    name: '区'
    *  },{// 镇 3
    *    id: 3,
    *    name: '镇'
    *  }
    * ]
    */
    defaultAddress: null,

    /*
    * 插件回调
    * data：[
    *   {//省
    *     id: 0,
    *     name: '省'
    *   },{// 市
    *     id: 1,
    *     name: '市'
    *   },{// 区
    *     id: 2,
    *     name: '区'
    *   },{// 镇
    *     id: 3,
    *     name: '镇'
    *   },
    * ]
    */
    closeAdressList: {
      type: Function,
      default: () => data => data,
    },
  },
  data() {
    return {
      ldsrc,
      showLastNav: true,
      showLoading: true,
      addressArr: [],
      addressNavActive: 0,

      // 静态地址库
      info: [],
    };
  },
  methods: {
    async setdefaultAddress(a) {
      this.addressArr = [];
      this.showLoading = true;
      if (!a || !a.length) {
        const data = await getAddressList('getProvince');
        this.setAddressData(data, 0);
      } else {
        // 数据过滤
        for (let i = 0, alen = a.length; i < alen; i++) {
          if (!a[i].name) {
            a.splice(i, alen);
          }
        }
        // 请求列表
        const data = await Promise.all([
          getAddressList('getProvince'),
          a[0] && getAddressList('getCity', a[0].id),
          a[1] && getAddressList('getCounty', a[1].id),
          a[2] && getAddressList('getTown', a[2].id)
        ]);

        const dlen = data.length;
        for (let i = 0; i < dlen; i++) {
          if (data[i]) {
            this.setAddressData(data[i], i);
          }
        }
        this.addressSelected(a.length - 1);
        this.showLastNav = false;
        this.addressArr = a;
      }
      this.showLoading = false;
      this.closeOut();
    },
    addressSelected(navIndex) {
      // 正在选择的 省||市||区
      this.addressNavActive = navIndex;
    },
    async getAddressId(id, name, navIndex) {
      const tarray = ['getProvince', 'getCity', 'getCounty', 'getTown'];

      // loading.start
      this.showLoading = true;

      // 当前选中的 省||市||区
      this.addressArr.splice(
        navIndex,
        this.addressArr.length - navIndex,
        { id, name }
      );

      // 请求数据
      if (navIndex < 3) {
        const data = await getAddressList(tarray[navIndex + 1], id);

        // 数据处理
        const n = this.setAddressData(data, navIndex + 1);

        // 正在选择的 省||市||区
        if (n) {
          this.addressNavActive = navIndex + 1;
          this.showLastNav = true;
        } else {
          this.showLastNav = false;
          // 导出数据并关闭列表 getAddressList
          this.closeOut();
        }
      } else {
        this.showLastNav = false;

        // 导出数据并关闭列表 getAddressList
        this.closeOut();
      }
      // loading.end
      this.showLoading = false;
    },
    setAddressData(data, navIndex) {
      let r = true;
      if (data.status === 200) {
        if (data.item.result) {
          this.info.splice(
            navIndex,
            this.info.length - navIndex,
            data.item.result
          );
          r = true;
        } else {
          this.$Toast(data.item.resultMessage);
          r = false;
        }
      } else {
        if (data.msg && !~data.msg.indexOf('|3405')) this.$Toast(data.msg);
        r = false;
      }
      return r;
    },
    closeOut() {
      let dataOut = null;
      if (!this.showLastNav) {
        dataOut = this.addressArr;
      }
      // 导出数据并关闭列表
      this.$emit('closeAdressList', dataOut);
      // this.closeAdressList(dataOut);
    }
  },
  mounted() {
    setTimeout(() => {
      this.setdefaultAddress(this.defaultAddress);
    }, 10);
  }
};
