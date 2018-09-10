import ossHttps from './oss';
import {
  htmlEncode,
  htmlDecode,
} from './html';

function name(val) {
  return `filter: ${val}`;
}

export {
  name,
  ossHttps as oss,
  htmlEncode,
  htmlDecode,
};
