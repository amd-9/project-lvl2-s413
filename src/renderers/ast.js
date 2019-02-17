import _ from 'lodash';
import renderGeneric from './generic';
import renderPlain from './plain';
import renderJson from './json';


const renderers = {
  generic: renderGeneric,
  plain: renderPlain,
  json: renderJson,
};

export default format => _.get(renderers, format, renderers.generic);
