import fs from 'fs';
import path from 'path';
import generateDiff from '../src';

const configFiles = [
  ['json'],
  ['yml'],
  ['ini'],
];

test.each(configFiles)('Should diff .%s files with relative path', (configExtension) => {
  const pathToConfig1 = `__tests__/__fixtures__/${configExtension}/before.${configExtension}`;
  const pathToConfig2 = `__tests__/__fixtures__/${configExtension}/after.${configExtension}`;
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/diff_result.txt'), 'utf-8');

  expect(generateDiff(pathToConfig1, pathToConfig2)).toBe(expected);
});


test.each(configFiles)('Should diff .%s files with absolute path', (configExtension) => {
  const pathToConfig1 = path.resolve(__dirname, `__fixtures__/${configExtension}/before.${configExtension}`);
  const pathToConfig2 = path.resolve(__dirname, `__fixtures__/${configExtension}/after.${configExtension}`);
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/diff_result.txt'), 'utf-8');

  expect(generateDiff(pathToConfig1, pathToConfig2)).toBe(expected);
});

test('Should diff recursive files', () => {
  const pathToConfig1 = '__tests__/__fixtures__/recursive/before.json';
  const pathToConfig2 = '__tests__/__fixtures__/recursive/after.json';
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/diff_result_recursive.txt'), 'utf-8');

  expect(generateDiff(pathToConfig1, pathToConfig2)).toBe(expected);
});

test('Should output diff result as plain format', () => {
  const pathToConfig1 = '__tests__/__fixtures__/json/before.json';
  const pathToConfig2 = '__tests__/__fixtures__/json/after.json';
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/diff_result_plain.txt'), 'utf-8');

  expect(generateDiff(pathToConfig1, pathToConfig2, 'plain')).toBe(expected);
});
