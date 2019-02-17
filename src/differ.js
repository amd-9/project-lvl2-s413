import _ from 'lodash';
// import buidASTRenderer from './renders/ast';

const getPredicateActions = (firstConfig, secondConfig) => {
  const predicateActions = [
    {
      predicate: key => _.has(firstConfig, key) && !_.has(secondConfig, key),
      action: key => ({ key, type: 'removed', value: firstConfig[key] }),
    },
    {
      predicate: key => !_.has(firstConfig, key),
      action: key => ({ key, type: 'added', value: secondConfig[key] }),
    },
    {
      predicate: key => (_.isObject(firstConfig[key]) && _.isObject(secondConfig[key])),
      action: (key, f) => ({ key, type: 'parent', children: f(firstConfig[key], secondConfig[key]) }),
    },
    {
      predicate: key => firstConfig[key] !== secondConfig[key],
      action: key => ({
        key, type: 'modified', currentValue: secondConfig[key], previousValue: firstConfig[key],
      }),
    },
    {
      predicate: key => (firstConfig[key] === secondConfig[key]),
      action: key => ({ key, type: 'unchanged', value: firstConfig[key] }),
    },
  ];

  return predicateActions;
};

const buildAST = (firstConfig, secondConfig) => {
  const configKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  const predicateActions = getPredicateActions(firstConfig, secondConfig);

  const reducer = (acc, key) => {
    const { action } = predicateActions.find(({ predicate }) => predicate(key));
    return [...acc, action(key, buildAST)];
  };

  return configKeys.reduce(reducer, []);
};

export default buildAST;
