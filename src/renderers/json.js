import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const renderAST = (astNode, path) => {
  const {
    key, type, value, children,
  } = astNode;

  const renderPatterns = {
    added: currentKey => ({ path: `${path.join('.')}${currentKey}`, action: 'added', value: `${stringify(value)}` }),
    removed: currentKey => ({ path: `${path.join('.')}${currentKey}`, action: 'removed' }),
    modified: (currentKey, newValue, oldValue) => ({
      path: `${path.join('.')}${currentKey}`,
      action: 'updated',
      currentValue: `${stringify(newValue)}`,
      previousValue: `${stringify(oldValue)}`,
    }),
    unchanged: currentKey => ({ path: `${path.join('.')}${currentKey}`, action: 'unchanged' }),
  };

  if (_.isArray(astNode)) {
    const [{ key: nodeKey, value: newValue }, { value: oldValue }] = astNode;
    return renderPatterns.modified(nodeKey, newValue, oldValue);
  }

  if (children) {
    return children.map(node => renderAST(node, [...path, `${key}.`]));
  }

  return renderPatterns[type](key, value);
};


export default ast => ast.reduce((acc, node) => [...acc, renderAST(node, [])], []);
