/*
* 参数 val 是目的时间，返回值为毫秒
* 格式为 'yyyy/mm/dd hh:mm:ss'、'yyyy/mm/dd hh:mm:ss'、Date对象
*/
function getTime(val) {
  let res = 0;
  if (val) {
    res = new Date(val.replace(/-/g, '/'));
  } else {
    res = new Date();
  }
  return res.getTime();
}

// 计算日时分 参数 val 是相差的毫秒
function getTimeDays(val) {
  // 计算出相差天数
  const days = parseInt(val / (24 * 3600 * 1000), 10);

  // 计算出小时数
  const hours = parseInt((val % (24 * 3600 * 1000)) / (3600 * 1000), 10);

  // 计算相差分钟数
  const minutes = parseInt((val % (3600 * 1000)) / (60 * 1000), 10);

  return { days, hours, minutes };
}

export { getTime, getTimeDays };
