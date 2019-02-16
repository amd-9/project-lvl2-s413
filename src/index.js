import fs from 'fs';
import path from 'path';
import render from './differ';
import getParser from './registry';

export default (pathToConfig1, pathToConfig2) => {
  const configType = path.extname(pathToConfig1);
  const parse = getParser(configType);

  const firstConfig = parse(fs.readFileSync(path.resolve(pathToConfig1), 'utf-8'));
  const secondConfig = parse(fs.readFileSync(path.resolve(pathToConfig2), 'utf-8'));

  return render(firstConfig, secondConfig);
};
