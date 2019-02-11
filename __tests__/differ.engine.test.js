import differ from '../src/differ-engine';

test('type', () => {
  expect(differ('test')).toBe('test');
});