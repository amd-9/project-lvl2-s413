import fs from 'fs';
import path from 'path';
import getDiffer from './differ';
import getParser from './registry';

export default (pathToConfig1, pathToConfig2) => {
  const configType = path.extname(pathToConfig1);
  const parser = getParser(configType);

  const firstConfig = parser(fs.readFileSync(path.resolve(pathToConfig1), 'utf-8'));
  const secondConfig = parser(fs.readFileSync(path.resolve(pathToConfig2), 'utf-8'));

  return getDiffer(firstConfig, secondConfig);
};
