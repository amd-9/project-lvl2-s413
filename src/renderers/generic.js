import _ from 'lodash';

const paddingPerLevel = 4;
const modificationSymbolLength = 2;

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  const padding = ' '.repeat(level * paddingPerLevel);

  return `{\n${Object.keys(value).map(key => `${padding}    ${key}: ${stringify(value[key], level + 1)}`).join('\n')}\n${padding}}`;
};

const renderAST = (astNode, level) => {
  const padding = ' '.repeat(level * paddingPerLevel);
  const symbolPadding = ' '.repeat(level * paddingPerLevel - modificationSymbolLength);
  const {
    key, type, value, children,
  } = astNode;

  const renderPatterns = {
    added: () => `${symbolPadding}+ ${key}: ${stringify(value, level)}`,
    removed: () => `${symbolPadding}- ${key}: ${stringify(value, level)}`,
    modified: () => {
      const { currentValue, previousValue } = astNode;
      return [
        `${symbolPadding}+ ${key}: ${stringify(currentValue, level)}`,
        `${symbolPadding}- ${key}: ${stringify(previousValue, level)}`,
      ];
    },
    unchanged: () => `${padding}${key}: ${stringify(value, level)}`,
    parent: () => [`${padding}${key}: {`,
      ...children.map(node => renderAST(node, level + 1)),
      `${padding}}`],
  };

  return renderPatterns[type](padding);
};

export default ast => `{\n${_.flattenDeep(ast.map(node => renderAST(node, 1))).join('\n')}\n}`;
