#! /usr/bin/env node
import program from 'commander';
import buildDiffer from '..';

program.description('Compares two configuration files and shows a difference.')
  .version('0.4.3')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'generic')
  .action((firstConfig, secondConfig) => {
    if (firstConfig && secondConfig) {
      console.log(buildDiffer(firstConfig, secondConfig, program.format));
    }
  });

program.parse(process.argv);
