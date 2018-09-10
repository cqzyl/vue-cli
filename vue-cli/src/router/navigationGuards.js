// navigation guards
import linkNotTo from '@/config/linkNotTo';
import { getToken, getInterUrl, setInterUrl } from '@/utils/cookie';
import toSignIn from '@/utils/signIn';

const outHref = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;

let userToken = '';

function navigationGuards(to, from, next) {
  const thisToPath = to.path;

  if (!userToken) userToken = getToken();

  // 用户未进行微信登录
  if (!userToken) {
    setInterUrl(to.fullPath);
    // next('/register');
    toSignIn();
    return false;
  }

  // 用户已进行微信登录且跳转链接为空
  if (thisToPath === '/') {
    const topath = getInterUrl();
    /* eslint-disable no-bitwise */
    if (topath && !~linkNotTo.indexOf(topath)) {
      // 存在有效的目的链接
      next(topath);
    } else {
      next();
    }
    return false;
  }

  // 外链跳转
  if (~thisToPath.indexOf('//') && to.name === '404') {
    const outLink = thisToPath.match(outHref)[0];
    console.log('外链跳转', outLink);
    window.location.href = outLink;
    return false;
  }

  // 用户已进行微信登录
  next();
  return false;
}

export { navigationGuards as default };
