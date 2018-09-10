import HTMLTrope from '@/config/HTMLTrope';

// 根据data生成正则
function dataToRegExp(obj) {
  const arrRegExp = [];

  Object.keys(obj).forEach((key) => {
    arrRegExp.push(key);
  });
  return new RegExp(`(${arrRegExp.join('|')})`, 'ig');
}

// 设置解码data
function getRData(obj) {
  const r = {};
  Object.keys(obj).forEach((key) => {
    r[obj[key]] = key;
  });
  return r;
}

const dataRegExp = dataToRegExp(HTMLTrope);
// 解码用rData
const rData = getRData(HTMLTrope);
const rDataRegExp = dataToRegExp(rData);

// 编码toread
function htmlEncode(str = '') {
  return str.replace(rDataRegExp, (all, t) => rData[t]);
}
// 解码tocode
function htmlDecode(str = '') {
  return str.replace(dataRegExp, (all, t) => HTMLTrope[t]);
}

export {
  htmlEncode,
  htmlDecode,
};
