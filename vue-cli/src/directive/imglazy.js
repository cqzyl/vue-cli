/* eslint-disable no-param-reassign */
/*
* 状态：loading animate error loaded
*
*
*/
// img懒加载 > ie8
import defaultImglazy from '@/config/defaultImglazy';

// 动画时间
const animateTime = defaultImglazy.time || 1000;

// 加载默认图片
Object.keys(defaultImglazy).forEach((key) => {
  const isrc = defaultImglazy[key];
  if (isrc) {
    const iimg = new Image();
    iimg.src = defaultImglazy[key];
  }
});

function theLoaded(el, tsrc) {
  el.src = tsrc;
  el.setAttribute('data-imglazy', 'animate');
  setTimeout(() => {
    el.setAttribute('data-imglazy', 'loaded');
  }, animateTime);
  return true;
}

const imglazy = {
  inserted(el, ag) {
    const tsrc = ag.value;
    el.src = defaultImglazy.loading;
    el.setAttribute('data-imglazy', 'loading');

    const img = new Image();
    img.src = tsrc;
    img.onload = () => theLoaded(el, tsrc);
    img.onerror = () => {
      el.src = defaultImglazy.error;
      el.setAttribute('data-imglazy', 'error');
    };
    if (img.complete) {
      theLoaded(el, tsrc);
      img.onload = null;
      img.onerror = null;
    }
  },
};

export { imglazy as default };
