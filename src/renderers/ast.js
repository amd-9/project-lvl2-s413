import _ from 'lodash';
import renderGeneric from './generic';
import renderPlain from './plain';

const renderers = {
  generic: renderGeneric,
  plain: renderPlain,
  json: () => 'Not implemented!',
};

export default ast => ({
  render: format => (_.has(renderers, format) ? renderers[format](ast) : renderers.generic(ast)),
});
