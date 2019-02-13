import yaml from 'js-yaml';
import _ from 'lodash';
import path from 'path';
import genericDiffer from './parsers/generic';

const parserRegisty = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

const getParse = type => (_.has(parserRegisty, type) ? parserRegisty[type] : JSON.parse);

export default (pathToConfig1, pathToConfig2) => {
  const confingType = path.extname(pathToConfig1);
  const parse = getParse(confingType);

  return genericDiffer(parse, pathToConfig1, pathToConfig2);
};
