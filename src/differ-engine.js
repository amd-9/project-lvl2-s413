import fs from 'fs';
import path from 'path';

export default (pathToConfig1, pathToConfig2) => {
  const firstConfig = JSON.parse(fs.readFileSync(path.resolve(pathToConfig1)));
  const secondConfig = JSON.parse(fs.readFileSync(path.resolve(pathToConfig2)));

  const reducer = (acc, key) => {
    if (Object.prototype.hasOwnProperty.call(secondConfig, key)) {
      return firstConfig[key] !== secondConfig[key]
        ? { ...acc, [`+ ${key}`]: secondConfig[key], [`- ${key}`]: firstConfig[key] } : { ...acc, [`  ${[key]}`]: firstConfig[key] };
    }
    return { ...acc, [`- ${key}`]: firstConfig[key] };
  };

  const deletedOrChanged = Object.keys(firstConfig).reduce(reducer, {});
  const added = Object.keys(secondConfig).reduce((acc, key) => (
    Object.prototype.hasOwnProperty.call(firstConfig, key)
      ? acc : { ...acc, [`+ ${key}`]: secondConfig[key] }), {});
  const diffResult = { ...deletedOrChanged, ...added };

  return `{${Object.keys(diffResult).reduce((acc, key) => `${acc}\n  ${key}: ${diffResult[key]}`, '')}\n}`;
};
