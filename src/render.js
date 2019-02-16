import _ from 'lodash';

const paddingPerLevel = 4;
const modificationSymbolLength = 2;

const stringify = (value, level) => {
  const padding = ' '.repeat(level * paddingPerLevel);
  if (_.isObject(value)) {
    return `{\n${Object.keys(value).map(key => `${padding}    ${key}: ${stringify(value[key], level + 1)}`).join('\n')}\n${padding}}`;
  }
  return value;
};

const renderAST = (astNode, level) => {
  const padding = ' '.repeat(level * paddingPerLevel);
  const symbolPadding = ' '.repeat(level * paddingPerLevel - modificationSymbolLength);
  const {
    key, status, value, children,
  } = astNode;

  const renderPatterns = {
    added: currentKey => `${symbolPadding}+ ${currentKey}: ${stringify(value, level)}`,
    removed: currentKey => `${symbolPadding}- ${currentKey}: ${stringify(value, level)}`,
    unchanged: currentKey => `${padding}${currentKey}: ${stringify(value, level)}`,
  };

  if (children) {
    return `${padding}${key}: {\n${children.map(node => renderAST(node, level + 1)).join('\n')}\n${padding}}`;
  }

  return renderPatterns[status](key, value, padding);
};

export default ast => `{\n${ast.map(node => renderAST(node, 1)).join('\n')}\n}`;
