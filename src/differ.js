import _ from 'lodash';

export default (config1, config2) => {
  const configKeys = _.union(Object.keys(config1), Object.keys(config2));

  const reducer = (acc, key) => {
    if (_.has(config1, key)) {
      if (_.has(config2, key)) {
        return config1[key] !== config2[key] ? [...acc,
          `  + ${key}: ${config2[key]}`,
          `  - ${key}: ${config1[key]}`] : [...acc, `    ${key}: ${config1[key]}`];
      }
      return [...acc, `  - ${key}: ${config1[key]}`];
    }
    return [...acc, `  + ${key}: ${config2[key]}`];
  };
  const diffResult = configKeys.reduce(reducer, []);

  return `{\n${diffResult.join('\n')}\n}`;
};
