import _ from 'lodash';
import render from './render';

const buildAST = (config1, config2) => {
  const configKeys = _.union(Object.keys(config1), Object.keys(config2));

  const reducer = (acc, key) => {
    if (_.has(config1, key)) {
      if (_.has(config2, key)) {
        if (_.isObject(config1[key])) {
          if (_.isObject(config2[key])) {
            return [...acc, {
              key,
              status: 'unchanged',
              children: buildAST(config1[key], config2[key]),
            }];
          }
          return [...acc, [{
            key,
            status: 'added',
            value: config2[key],
          }, {
            key,
            status: 'removed',
            value: config1[key],
          }]];
        }
        if (_.isObject(config2[key])) {
          return [...acc, [{
            key,
            status: 'added',
            value: config2[key],
          }, {
            key,
            status: 'removed',
            value: config1[key],
          }]];
        }
        if (config1[key] !== config2[key]) {
          return [...acc, [{
            key,
            status: 'added',
            value: config2[key],
          }, {
            key,
            status: 'removed',
            value: config1[key],
          }]];
        }
        return [...acc, {
          key,
          status: 'unchanged',
          value: config1[key],
        }];
      }
      return [...acc, {
        key,
        status: 'removed',
        value: config1[key],
      }];
    }

    return [...acc, {
      key,
      status: 'added',
      value: config2[key],
    }];
  };

  return configKeys.reduce(reducer, []);
};

export default (firstConfig, secondConfig) => {
  const ast = buildAST(firstConfig, secondConfig);
  return render(ast);
};
