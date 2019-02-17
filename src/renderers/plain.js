import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const renderAST = (astNode, path) => {
  const {
    key, type, value, children,
  } = astNode;

  const renderPatterns = {
    added: () => `Property '${path.join('.')}${key}' was added with value: ${stringify(value)}`,
    removed: () => `Property '${path.join('.')}${key}' was removed`,
    modified: () => {
      const { currentValue, previousValue } = astNode;
      return [`Property '${path.join('.')}${key}' was updated. `,
        `From ${stringify(previousValue)} to ${stringify(currentValue)}`].join('');
    },
    parent: () => _.filter(children, child => child.type !== 'unchanged')
      .map(node => renderAST(node, [...path, `${key}.`])).join('\n'),
    unchanged: () => '',
  };

  return renderPatterns[type](key, value);
};


export default ast => `${_.filter(ast, node => node.type !== 'unchanged').map(node => renderAST(node, [])).join('\n')}`;
