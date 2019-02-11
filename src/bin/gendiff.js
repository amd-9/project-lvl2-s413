#! /usr/bin/env node
import program from 'commander';
import differ from '../differ-engine';

program.description('Compares two configuration files and shows a difference.')
  .version('0.0.10')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

if (program.format) {
  console.log(`selected format:  ${differ(program.format)}`);
}
