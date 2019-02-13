import fs from 'fs';
import path from 'path';
import differ from '../src/differ-engine';

test('should_diff_json_configs_relative_path', () => {
  const pathToConfig1 = '__tests__/__fixtures__/before.json';
  const pathToConfig2 = '__tests__/__fixtures__/after.json';
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/json_diff_result.txt'), 'utf8');

  expect(differ(pathToConfig1, pathToConfig2)).toBe(expected);
});

test('should_diff_json_configs_absolute_path', () => {
  const pathToConfig1 = path.resolve(__dirname, '__fixtures__/before.json');
  const pathToConfig2 = path.resolve(__dirname, '__fixtures__/after.json');
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/json_diff_result.txt'), 'utf8');

  expect(differ(pathToConfig1, pathToConfig2)).toBe(expected);
});

test('should_diff_yaml_configs_relative_path', () => {
  const pathToConfig1 = '__tests__/__fixtures__/before.yml';
  const pathToConfig2 = '__tests__/__fixtures__/after.yml';
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/yaml_diff_result.txt'), 'utf8');

  expect(differ(pathToConfig1, pathToConfig2)).toBe(expected);
});

test('should_diff_yaml_configs_absolute_path', () => {
  const pathToConfig1 = path.resolve(__dirname, '__fixtures__/before.yml');
  const pathToConfig2 = path.resolve(__dirname, '__fixtures__/after.yml');
  const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/yaml_diff_result.txt'), 'utf8');

  expect(differ(pathToConfig1, pathToConfig2)).toBe(expected);
});
