/**
 * Lib functions for text-converter
 */

function extractComments(input) {
  const lines = input.toString().match(/&(.*)/mg);

  if (lines) {
    return lines.map(line => {
      const trimmed = line
        .slice(1, line.length) // Remove ampersand...
        .replace(/^\t+/, '') // Remove any leading tabs...
        .trim() // Remove any leading or trailing spaces...
        .replace(/(?:^["']|["']$)/gm, ''); // Remove wrapping quote marks...

      // Split by tab, or split by equal sign.
      if (!!~trimmed.indexOf('\t')) return trimmed.split('\t').map(item => item.trim());
      else {
        return trimmed.split('=').map(item => item.trim());
      }
    });
  } else {
    return [];
  }
}

function cleanInput(input, comments) {
  const papa = require('papaparse');
  const cleaned = input.toString()
    .replace(/^[^a-b0-9&\t]*&.*?"?\r?\n?$/mg, '') // Remove all comments
    .replace(/^[\r\n\t\s\0]+$/mg, '') // Remove empty newline lines
    .replace(/[\t\s]+$/gm, '') // Remove tabs at the end of lines
    .replace(/^[\t\r\n]+/gm, '') // Remove tabs, newlines at the beginning of lines

  let data = [];

  papa.parse(cleaned, {
    delimiter: '\t',
    header: false,
    dynamicTyping: true,
    step: row => { // Clean out extra spaces.
      if (row.errors.length) {
        console.error(`Parsing error:\n ${row.errors.split('\n')}`);
        throw new Error(row.errors);
      }
      const processed = row.data[0].map(cell => {
        return typeof cell.trim === 'function' ? cell.trim().replace(/\t/g, '') : cell;
      })
      data.push(processed);
    }
  });

  data = data.filter(v => v.length > 0 && v[0] !== '');

  if (comments.length) {
    data.unshift(comments[0].slice(0)); // Shallow-copy; otherwise `comments` gets modified!
    if (data.length > 1 && data[0].length - data[1].length === -1) {
      if (data[1][0].match(/(?:\d{1,4}[-\/]\w+[-\/]\d{1,4}|Q[1-4]\s?\d{4})/)) data[0].unshift('date');
      else data[0].unshift('&');
    }
  }

  return data;
}

module.exports.extractComments = extractComments;
module.exports.cleanInput = cleanInput;
