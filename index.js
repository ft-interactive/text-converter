#!/usr/bin/env node
/**
 * text-converter
 * 2016 Ændrew Rininsland
 *
 * This converts .txt files in TSV format with comments into CSV or JSON
 */

const meow = require('meow');
const papa = require('papaparse');
const fs = require('fs');
const cleanInput = require('./lib').cleanInput;
const extractComments = require('./lib').extractComments;
const cli = meow(`
  Usage:
    $ txtconvert <input-files> [options]

  Options:
    --csv, -c      Output as CSV (default)
    --json, -j     Output as JSON
    --stdout, -s   Output to stdout as JSON
`, {
  alias: {
    c: 'csv',
    j: 'json',
    s: 'stdout'
  }
});

if (cli.input.length) {
  cli.input.forEach(path => {
    try {
      const input = fs.readFileSync(path, {encoding: 'utf-8'});
      const comments = extractComments(input);
      const data = cleanInput(input, comments);
      const outputConf = {
        quotes: true
      };

      if (cli.flags.csv !== 'false') {
        fs.writeFileSync(
          path.replace(/\..+?$/, '.csv'),
          papa.unparse(data, outputConf),
          { encoding: 'utf-8' }
        );
      }

      if (cli.flags.json) {
        fs.writeFileSync(
          path.replace(/\..+?$/, '.json'),
          JSON.stringify(data),
          { encoding: 'utf-8' }
        );
      }

      if (cli.flags.stdout) {
        console.dir(data);
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.error(`Invalid filename: ${path}`);
      } else {
        console.error(e);
      }
    }
  });
} else {
  cli.showHelp();
}
