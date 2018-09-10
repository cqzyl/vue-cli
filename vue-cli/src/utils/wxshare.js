/* 微信分享 */
import Vue from 'vue';
import wx from 'weixin-js-sdk';
import appId from '@/config/wxshare';
import { WxshareApi } from '@/api/wx';

async function wxshare() {
  // 发起 http 请求，获取公众号配置
  const options = { url: window.location.href.split('#')[0] };
  const data = await WxshareApi(options);

  if (data.status !== 200) {
    if (data.msg) Vue.prototype.$Toast(data.msg);
    return false;
  }

  wx.config({
    debug: false,
    appId,
    timestamp: data.item.timestamp,
    nonceStr: data.item.nonceStr,
    signature: data.item.signature,
    jsApiList: [],
  });

  wx.ready(() => {
    // 禁止微信分享
    wx.hideAllNonBaseMenuItem();
    wx.hideOptionMenu();
  });

  wx.error((res) => {
    /*
    * config信息验证失败会执行error函数
    * 如: 签名过期导致验证失败，
    * 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看
    * 对于SPA可以在这里更新签名
    */
    // Vue.prototype.$Toast('config信息验证失败');
    console.log(res);
  });
  return null;
}

export { wxshare as default };
