import { oss } from '@/config/http';

function ossHttps(value) {
  return (~value.indexOf('//') ? '' : oss.https) + value;
}

export { ossHttps as default };
