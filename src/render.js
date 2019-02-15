const paddingPerLevel = 2;

export default (ast) => {
  console.log(ast);

  const iter = (node, level) => {
    const padding = ' '.repeat(level * paddingPerLevel);
    const {
      key, status, currentValue, previousValue, children,
    } = node;

    if (status === 'unchanged') {
      if (typeof children !== 'undefined') {
        return `${padding}  ${key}: {\n${children.map(iter, level + 1).join('')}\n}`;
      }
      return `${padding}  ${key}: ${currentValue}\n`;
    }

    if (status === 'added') {
      if (typeof children !== 'undefined') {
        return `${padding}+ ${key}: {\n${children.map(iter, level + 1).join('')}\n}`;
      }
      return `${padding}+ ${key}: ${currentValue}\n`;
    }

    if (status === 'removed') {
      if (typeof children !== 'undefined') {
        return `${padding}- ${key}: {\n${children.map(iter, level + 1).join('')}\n}`;
      }
      return `${padding}- ${key}: ${currentValue}\n`;
    }

    if (status === 'modified') {
      if (typeof children !== 'undefined') {
        return [`${padding}- ${key}: ${previousValue}\n`,
          `${padding}+ ${key}: {\n${children.map(iter, level + 1).join('')}\n}`].join('');
      }
    }
    return [`${padding}+ ${key}: ${previousValue}\n`,
      `${padding}- ${key}: ${currentValue}\n`].join('');
  };


  return `{\n${ast.map(node => iter(node, 1)).join('')}}`;
};
