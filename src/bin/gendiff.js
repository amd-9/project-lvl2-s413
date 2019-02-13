#! /usr/bin/env node
import program from 'commander';
import differ from '../differ-engine';

program.description('Compares two configuration files and shows a difference.')
  .version('0.2.0')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    if (firstConfig && secondConfig) {
      console.log(differ(firstConfig, secondConfig));
    }
  });

program.parse(process.argv);
