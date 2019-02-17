#! /usr/bin/env node
import program from 'commander';
import generateDiff from '..';

program.description('Compares two configuration files and shows a difference.')
  .version('0.5.2')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'generic')
  .action((firstConfig, secondConfig) => {
    if (firstConfig && secondConfig) {
      console.log(generateDiff(firstConfig, secondConfig, program.format));
    }
  });

program.parse(process.argv);
