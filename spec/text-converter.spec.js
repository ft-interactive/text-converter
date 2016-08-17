/**
 * Specs for text-converter
 */

const { extractComments, cleanInput } = require('../lib');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const chai = require('chai');

chai.should(); // Uses should syntax.

describe('parsing "COS Airbus stack bar2.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'COS Airbus stack bar2.txt');
  const data = readFileSync(path);
  const comments = extractComments(data);
  const output = cleanInput(data, comments);

  it('should be able to parse comments', () => {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Narrow', 'Wide']);
    comments[1].should.eql(['title', 'Commercial aircraft order backlog']);
    comments[2].should.eql(['subtitle', 'Number of jets, as at Jul 2016']);
    comments[3].should.eql(['source', 'companies']);
    comments[4].should.eql(['footnote', 'delete if not required']);
    comments[5].should.eql(['comment', 'Any message you want Graphics to see during processing; delete if not required']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'true']);
  });

  it('should be able to clean data', () => {
    output.should.have.lengthOf(3);
    output[0].should.eql(['&', 'Narrow', 'Wide']);
    output[1].should.eql(['Airbus', 5558, 1257]);
    output[2].should.eql(['Boeing', 4044, 1653]);
  });
});

describe('parsing "Datawatch Tuesday.txt', () => {
  const path = resolve(__dirname, 'mocks', 'Datawatch Tuesday.txt');
  const data = readFileSync(path);
  const comments = extractComments(data);
  const output = cleanInput(data, comments);

  it('should be able to parse comments', () => {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Exports', 'Imports']);
    comments[1].should.eql(['title', 'Turkey trade with Russia']);
    comments[2].should.eql(['subtitle', '% share of total exports and imports']);
    comments[3].should.eql(['source', 'IMF, Thomson Reuters Datastream']);
    comments[4].should.eql(['footnote', 'delete if not required']);
    comments[5].should.eql(['comment', 'Line chart']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'false']);
  });

  it('should be able to clean data', () => {
    output.should.have.lengthOf(268);
    output[0].should.eql(['date', 'Exports', 'Imports']);
  });
});

describe('parsing "lex3 line.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'lex3 line.txt');
  const data = readFileSync(path);
  const comments = extractComments(data);
  const output = cleanInput(data, comments);

  it('should be able to parse comments', () => {
    comments.should.have.lengthOf(8);
    comments[0].should.eql([
      'UOB total NPAs',
      'UOB unsecured NPAs',
      'DBS total NPAs',
      'DBS unsecured NPAs',
      'OCBC total NPAs',
      'OCBC unsecured NPAs'
    ]);
    comments[1].should.eql(['title', 'Coverage ratios']);
    comments[2].should.eql(['subtitle', 'Total provision as % of non-performing assets']);
    comments[3].should.eql(['source', 'companies']);
    comments[4].should.eql(['footnote', 'delete if not required']);
    comments[5].should.eql(['comment', 'Line chart']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'false']);
  });

  it('should be able to clean data', () => {
    output.should.have.lengthOf(6);
    output[0].should.eql([
      'date',
      'UOB total NPAs',
      'UOB unsecured NPAs',
      'DBS total NPAs',
      'DBS unsecured NPAs',
      'OCBC total NPAs',
      'OCBC unsecured NPAs'
    ]);
  });
});

describe('parsing "WLD - Iran migration.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'WLD - Iran migration.txt');
  const data = readFileSync(path, { encoding: 'ucs2' });
  const comments = extractComments(data);
  const output = cleanInput(data, comments);

  it('should be able to parse comments', () => {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Trace 1']);
    comments[1].should.eql(['title', 'Iran\'s diaspora']);
    comments[2].should.eql(['subtitle', 'Iranian migrants living abroad in 2015*, top 20 destinations']);
    comments[3].should.eql(['footnote', '*Mid-2015 estimates']);
    comments[4].should.eql(['source', 'Migration Policy Institute']);
    comments[5].should.eql(['comment', 'Bar chart']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'false']);
  });

  it('should be able to clean data', () => {
    output.should.have.lengthOf(21);
    output[0].should.eql(['&', 'Trace 1']);
  });
});
