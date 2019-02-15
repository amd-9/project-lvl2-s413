const paddingPerLevel = 4;
const modificationSymbolLength = 2;

export default (ast) => {
  const iter = (node, level) => {
    const padding = ' '.repeat(level * paddingPerLevel);
    const symbolPadding = ' '.repeat(level * paddingPerLevel - modificationSymbolLength);

    const {
      key, status, currentValue, previousValue, children,
    } = node;

    if (status === 'unchanged') {
      if (typeof children !== 'undefined') {
        return `${padding}${key}: {\n${children.map(n => iter(n, level + 1)).join('')}${padding}}\n`;
      }
      return `${padding}${key}: ${currentValue}\n`;
    }

    if (status === 'added') {
      if (typeof children !== 'undefined') {
        return `${symbolPadding}+ ${key}: {\n${children.map(n => iter(n, level + 1)).join('')}${padding}}\n`;
      }
      return `${symbolPadding}+ ${key}: ${currentValue}\n`;
    }

    if (status === 'removed') {
      if (typeof children !== 'undefined') {
        return `${symbolPadding}- ${key}: {\n${children.map(n => iter(n, level + 1)).join('')}${padding}}\n`;
      }
      return `${symbolPadding}- ${key}: ${currentValue}\n`;
    }

    if (status === 'modified') {
      if (typeof children !== 'undefined') {
        if (typeof previousValue !== 'undefined' && typeof currentValue === 'undefined') {
          return [`${symbolPadding}- ${key}: ${previousValue}\n`,
            `${symbolPadding}+ ${key}: {\n${children.map(n => iter(n, level + 1)).join('')}${padding}}\n`].join('');
        }
        if (typeof previousValue === 'undefined' && typeof currentValue !== 'undefined') {
          return [`${symbolPadding}- ${key}: {\n${children.map(n => iter(n, level + 1)).join('')}${padding}}\n`,
            `${symbolPadding}+ ${key}: ${currentValue}\n`].join('');
        }
      }
    }
    return [`${symbolPadding}+ ${key}: ${previousValue}\n`,
      `${symbolPadding}- ${key}: ${currentValue}\n`].join('');
  };

  const result = `{\n${ast.map(node => iter(node, 1)).join('')}}`;

  return result;
};
