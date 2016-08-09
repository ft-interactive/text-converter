/**
 * Lib functions for text-converter
 */

const papa = require('papaparse');

function cleanInput(input, comments) {
  const cleaned = input.replace(/&.*?\r?\n/g, '').replace(/^\t/, '');
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

  return data;
}

function extractComments(input) {
  return input.match(/&(.*)/mg).map(line => {
    const trimmed = line.slice(1,line.length).replace(/^\t/, '').trim();
    if (!!~trimmed.indexOf('\t')) return trimmed.split('\t');
    else return trimmed.split('=');
  });
}

module.exports.extractComments = extractComments;
module.exports.cleanInput = cleanInput;
