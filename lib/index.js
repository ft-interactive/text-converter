/**
 * Lib functions for text-converter
 */

const papa = require('papaparse');

function cleanInput(input, comments) {
  const cleaned = input
    .replace(/^[^a-b0-9&\t]*&.*?"?\r?\n?$/mg, '') // Remove all comments
    .replace(/^[\r\n\t\s\0]+$/mg, '') // Remove empty newline lines
    .replace(/[\t\s]+$/gm, '') // Remove tabs at the end of lines
    .replace(/^[\t\r\n]+/gm, '') // Remove tabs, newlines at the beginning of lines

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

  data = data.filter(v => v.length > 0 && v[0] !== '');

  if (comments.length) {
    data.unshift(comments[0]);
    if (data.length > 1 && data[0].length - data[1].length === -1) {
      if (data[1][0].match(/(?:\d{1,4}[-\/]\w+[-\/]\d{1,4}|Q[1-4]\s?\d{4})/)) data[0].unshift('date');
      else data[0].unshift('&');
    }
  }

  return data;
}

function extractComments(input) {
  return input.match(/&(.*)/mg).map(line => {
    const trimmed = line.slice(1,line.length).replace(/^\t+/, '').trim();
    if (!!~trimmed.indexOf('\t')) return trimmed.split('\t');
    else return trimmed.split('=');
  });
}

module.exports.extractComments = extractComments;
module.exports.cleanInput = cleanInput;
