/*
* 登录
*
*/
import { TokenApi } from '@/api/signIn';
import { Instance } from './request';
import { setToken, getInterUrl } from './cookie';

let code = '';
let theUrl = '';

function reLink() {
  const routername = getInterUrl() || '';
  window.location.href = `${theUrl}#${routername}`;
}

function weixin() {
  window.location.href =
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9abbb2bf93e4f1d7&redirect_uri=${
      encodeURIComponent(theUrl)
    }&response_type=code&scope=snsapi_base&state=123&component_appid=wx66f06e74c0ae1a1f#wechat_redirect`;
}

function GetQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r) return unescape(r[2]);
  return null;
}

async function Token() {
  const item = await TokenApi({ code });

  if (+item.status === 200 && item.item && item.item.openid) {
    setToken(item.item.openid);

    Instance.defaults.headers.common['x-access-token'] = item.item.openid;

    reLink();
    return false;
  }

  if (item.msg) alert(item.msg);
  else alert(JSON.stringify(item, null, '\t'));

  setTimeout(() => {
    reLink();
  }, 2000);
}

function toSignIn() {
  code = GetQueryString('code');
  theUrl = window.location.href.split('#')[0].split('?')[0].replace('http:', 'https:');

  if (code) {
    Token();
  } else {
    weixin();
  }
}

export { toSignIn as default };
