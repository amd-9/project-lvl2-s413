import fs from 'fs';
import path from 'path';
import buildASTDiff from './differ';
import getASTRenderer from './renderers/ast';
import getParser from './parser';


export default (pathToConfig1, pathToConfig2, format = 'generic') => {
  const configType = path.extname(pathToConfig1);
  const parse = getParser(configType);

  const firstConfig = parse(fs.readFileSync(path.resolve(pathToConfig1), 'utf-8'));
  const secondConfig = parse(fs.readFileSync(path.resolve(pathToConfig2), 'utf-8'));

  const ast = buildASTDiff(firstConfig, secondConfig);
  const render = getASTRenderer(format);

  return render(ast);
};
