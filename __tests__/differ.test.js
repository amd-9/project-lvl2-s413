import fs from 'fs';
import path from 'path';
import differ from '../src';

const configFiles = [
  ['JSON file relative path',
    '__tests__/__fixtures__/json/before.json',
    '__tests__/__fixtures__/json/after.json',
    path.resolve(__dirname, '__fixtures__/diff_result.txt'),
  ],
  ['JSON file absolute path',
    path.resolve(__dirname, '__fixtures__/json/before.json'),
    path.resolve(__dirname, '__fixtures__/json/after.json'),
    path.resolve(__dirname, '__fixtures__/diff_result.txt'),
  ],
  ['YAML file relative path',
    '__tests__/__fixtures__/yaml/before.yml',
    '__tests__/__fixtures__/yaml/after.yml',
    path.resolve(__dirname, '__fixtures__/diff_result.txt'),
  ],
  ['YAML file absolute path',
    path.resolve(__dirname, '__fixtures__/yaml/before.yml'),
    path.resolve(__dirname, '__fixtures__/yaml/after.yml'),
    path.resolve(__dirname, '__fixtures__/diff_result.txt'),
  ],
  ['INI file relative path',
    path.resolve(__dirname, '__fixtures__/ini/before.ini'),
    path.resolve(__dirname, '__fixtures__/ini/after.ini'),
    path.resolve(__dirname, '__fixtures__/diff_result.txt'),
  ],
  ['INI file absolute path',
    path.resolve(__dirname, '__fixtures__/ini/before.ini'),
    path.resolve(__dirname, '__fixtures__/ini/after.ini'),
    path.resolve(__dirname, '__fixtures__/diff_result.txt'),
  ],
];

test.each(configFiles)('Should diff %s ', (configType, pathToConfig1, pathToConfig2, pathToResult) => {
  const expected = fs.readFileSync(path.resolve(pathToResult), 'utf-8');
  expect(differ(pathToConfig1, pathToConfig2)).toBe(expected);
});
