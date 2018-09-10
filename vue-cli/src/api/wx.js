import { Request } from '../utils/request';

const name = 'WxshareApi';

// 获取微信配置
function WxshareApi(data) {
  return Request({
    url: '/v1/wechat/wechat-jssdksign',
    data,
  });
}

export { WxshareApi, name };
