import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const renderAST = (astNode, path) => {
  const {
    key, type, value, children,
  } = astNode;

  const renderPatterns = {
    added: () => ({ path: `${path.join('.')}${key}`, action: 'added', value: `${stringify(value)}` }),
    removed: () => ({ path: `${path.join('.')}${key}`, action: 'removed' }),
    modified: () => {
      const { currentValue, previousValue } = astNode;
      return {
        path: `${path.join('.')}${key}`,
        action: 'updated',
        currentValue: `${stringify(currentValue)}`,
        previousValue: `${stringify(previousValue)}`,
      };
    },
    unchanged: () => ({ path: `${path.join('.')}${key}`, action: 'unchanged' }),
    parent: () => children.map(node => renderAST(node, [...path, `${key}.`])),
  };

  return renderPatterns[type]();
};


export default ast => ast.reduce((acc, node) => [...acc, renderAST(node, [])], []);
