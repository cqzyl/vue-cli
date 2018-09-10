import Vue from 'vue';
import axios from 'axios';
import defaultAxios from '@/config/defaultAxios';

const Instance = axios.create(defaultAxios);

function Request({
  type = 'get',
  url,
  data,
}) {
  const method = type.toLowerCase();

  const params = method === 'get' ? { params: data } : data;

  return new Promise((resolve) => {
    try {
      Instance[method](url, params)
        .then((response) => {
          const { data: resData } = response;

          resData.status = parseInt(resData.status, 10);

          if (resData.status === 429) {
            Vue.prototype.$Toast('请求次数太频繁啦，请稍后重试');
          }
          resolve(resData);
        })
        .catch((error) => {
          // 默认返回请求体请求错误信息
          Vue.prototype.$Toast('网络开小差了，请稍后再试呦~');
          console.error(error);
          resolve({ msg: error, status: 500 });
        });
    } catch (err) {
      console.error(err);
      resolve({ msg: '网络开小差了，请稍后再试呦~', status: 500 });
    }
  });
}

export {
  Request,
  Instance,
};
