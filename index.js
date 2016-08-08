/**
 * text-converter
 * 2016 Ændrew Rininsland
 *
 * This converts .txt files in TSV format with comments into CSV or JSON
 */

const meow = require('meow');
const papa = require('papaparse');
const fs = require('fs');

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
      const comments = input.match(/^&(.*)$/mg).map(line => {
        const trimmed = line.slice(1,line.length).replace(/^\t/, '');
        if (!!~trimmed.indexOf('\t')) return trimmed.split('\t');
        else return trimmed.split('=');
      });
      const cleaned = input.replace(/&.*?\n/g, '').replace(/^\t/, '');
      const parsed = papa.parse(cleaned, {
        delimiter: '\t',
        header: false
      });

      if (parsed.errors.length) {
        console.error('Parsing error:');
        console.error(parsed.errors);
        process.exit(2);
      }

      let data = parsed.data;

      if (comments.length && comments[0].length > 2) {
        data.unshift(comments[0]);
        if (data.length > 1 && data[0].length - data[1].length === -1) {
          data[0].unshift('date');
        }
      }

      data = data.filter(v => v.length > 0 && v[0] !== '');

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
      }
    }

  });
} else {
  cli.showHelp();
}
