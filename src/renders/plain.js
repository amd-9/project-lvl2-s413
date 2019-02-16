import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const renderAST = (astNode, path) => {
  const {
    key, status, value, children,
  } = astNode;

  const renderPatterns = {
    added: currentKey => `Property '${path.join('.')}${currentKey}' was added with value: ${stringify(value)}`,
    removed: currentKey => `Property '${path.join('.')}${currentKey}' was removed`,
    modified: (currentKey, newValue, oldValue) => [`Property '${path.join('.')}${currentKey}' was updated. `,
      `From ${stringify(oldValue)} to ${stringify(newValue)}`].join(''),
    unchanged: () => '',
  };

  if (_.isArray(astNode)) {
    const [{ key: nodeKey, value: newValue }, { value: oldValue }] = astNode;
    return renderPatterns.modified(nodeKey, newValue, oldValue);
  }

  if (children) {
    return _.filter(children, child => child.status !== 'unchanged')
      .map(node => renderAST(node, [...path, `${key}.`])).join('\n');
  }

  return renderPatterns[status](key, value);
};


export default ast => `${_.filter(ast, node => node.status !== 'unchanged').map(node => renderAST(node, [])).join('\n')}`;
