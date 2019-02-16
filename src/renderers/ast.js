import _ from 'lodash';
import renderGeneric from './generic';
import renderPlain from './plain';
import renderJson from './json';


const renderers = {
  generic: renderGeneric,
  plain: renderPlain,
  json: renderJson,
};

export default ast => ({
  render: format => (_.has(renderers, format) ? renderers[format](ast) : renderers.generic(ast)),
});
