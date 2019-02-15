import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parserRegisty = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default type => (_.has(parserRegisty, type) ? parserRegisty[type] : JSON.parse);
