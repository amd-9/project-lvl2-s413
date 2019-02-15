import _ from 'lodash';

export default (firstConfig, secondConfig) => {
  const configKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const reducer = (acc, key) => {
    if (_.has(firstConfig, key)) {
      if (_.has(secondConfig, key)) {
        if (firstConfig[key] !== secondConfig[key]) {
          return [...acc,
            `  + ${key}: ${secondConfig[key]}`,
            `  - ${key}: ${firstConfig[key]}`];
        }
        return [...acc, `    ${key}: ${firstConfig[key]}`];
      }
      return [...acc, `  - ${key}: ${firstConfig[key]}`];
    }
    return [...acc, `  + ${key}: ${secondConfig[key]}`];
  };
  const diffResult = configKeys.reduce(reducer, []);

  return `{\n${diffResult.join('\n')}\n}`;
};
