/*
* Cookie 操作
*
*/
import cookieName from '@/config/cookieNames';
import tokens from '@/config/token';

const test = process.env.NODE_ENV === 'development';

// cookie doing
const Cookies = {

  // 修改cookie
  set(cname, cvalue, cexpires) {
    const d = new Date();
    let expires = '';
    if (cexpires && cexpires.expires) {
      const exps = cexpires.expires;
      if (exps instanceof Date) {
        d.setTime(exps);
      } else if (!isNaN(exps)) {
        d.setTime(d.getTime() + (exps * 24 * 60 * 60 * 1000));
      } else {
        console.error('expires is not number or date objects');
      }
    }
    expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires}`;
  },

  // 获取cookie
  get(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    let res = '';

    for (let i = ca.length - 1; i > -1; i--) {
      const c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        res = c.substring(name.length, c.length);
        break;
      }
    }

    return res;
  },

  // 删除cookie
  del(cname) {
    return this.set(cname, '', { expires: -1 });
  },
};

/*
* 获取cookie实例
*/

// 用户token
function getToken() {
  return Cookies.get(cookieName.token);
}
function setToken(value) {
  return Cookies.set(cookieName.token, value, { expires: 1 });
}

// 用户进入的url
function getInterUrl() {
  return Cookies.get(cookieName.interUrl);
}
function setInterUrl(value) {
  return Cookies.set(cookieName.interUrl, value, { expires: 1 });
}

if (test) {
  setToken(tokens.testToken);
}

export {
  Cookies,
  getToken,
  setToken,
  getInterUrl,
  setInterUrl,
};
