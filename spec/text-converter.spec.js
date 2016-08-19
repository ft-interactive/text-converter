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

  function assertComments() {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Narrow', 'Wide']);
    comments[1].should.eql(['title', 'Commercial aircraft order backlog']);
    comments[2].should.eql(['subtitle', 'Number of jets, as at Jul 2016']);
    comments[3].should.eql(['source', 'companies']);
    comments[4].should.eql(['footnote', 'delete if not required']);
    comments[5].should.eql(['comment', 'Any message you want Graphics to see during processing; delete if not required']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'true']);
  };

  function assertData() {
    output.should.have.lengthOf(3);
    output[0].should.eql(['&', 'Narrow', 'Wide']);
    output[1].should.eql(['Airbus', 5558, 1257]);
    output[2].should.eql(['Boeing', 4044, 1653]);
  }

  describe('loading data as Buffer', () => {
    const data = readFileSync(path);
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });

  describe('loading data as String', () => {
    const data = readFileSync(path, { encoding: 'utf8' });
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });
});

describe('parsing "Datawatch Tuesday.txt', () => {
  const path = resolve(__dirname, 'mocks', 'Datawatch Tuesday.txt');

  function assertComments() {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Exports', 'Imports']);
    comments[1].should.eql(['title', 'Turkey trade with Russia']);
    comments[2].should.eql(['subtitle', '% share of total exports and imports']);
    comments[3].should.eql(['source', 'IMF, Thomson Reuters Datastream']);
    comments[4].should.eql(['footnote', 'delete if not required']);
    comments[5].should.eql(['comment', 'Line chart']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'false']);
  }

  function assertData() {
    output.should.have.lengthOf(268);
    output[0].should.eql(['date', 'Exports', 'Imports']);
  }

  describe('loading data as Buffer', () => {
    const data = readFileSync(path);
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });

  describe('loading data as String', () => {
    const data = readFileSync(path, {encoding: 'utf8'});
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });
});

describe('parsing "lex3 line.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'lex3 line.txt');

  function assertComments() {
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
  }

  function assertData() {
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
  }

  describe('loading data as Buffer', () => {
    const data = readFileSync(path);
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });

  describe('loading data as String', () => {
    const data = readFileSync(path, {encoding: 'utf8'});
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });
});

describe('parsing "WLD - Iran migration.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'WLD - Iran migration.txt');

  function assertComments() {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Trace 1']);
    comments[1].should.eql(['title', 'Iran\'s diaspora']);
    comments[2].should.eql(['subtitle', 'Iranian migrants living abroad in 2015*, top 20 destinations']);
    comments[3].should.eql(['footnote', '*Mid-2015 estimates']);
    comments[4].should.eql(['source', 'Migration Policy Institute']);
    comments[5].should.eql(['comment', 'Bar chart']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'false']);
  }

  function assertData() {
    output.should.have.lengthOf(21);
    output[0].should.eql(['&', 'Trace 1']);
  }

  describe('loading data as Buffer', () => {
    const data = readFileSync(path);
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });

  describe('loading data as String', () => {
    const data = readFileSync(path, {encoding: 'ucs2'});
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });
});

describe('parsing "Datawatch_Monday.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'Datawatch_Monday.txt');

  function assertComments() {
    comments.should.have.lengthOf(8);
    comments[0].should.eql(['Men', 'Women']);
    comments[1].should.eql(['title', 'Women consistently vote for the Democratic candidate']);
    comments[2].should.eql(['subtitle', '% who voted for the Democratic candidate according to US exit polls']);
    comments[3].should.eql(['source', 'Pew Research Centre']);
    comments[4].should.eql(['footnote', 'delete if not required']);
    comments[5].should.eql(['comment', 'Line chart']);
    comments[6].should.eql(['doublescale', '0']);
    comments[7].should.eql(['accumulate', 'false']);
  }

  function assertData() {
    output.should.have.lengthOf(12);
    output[0].should.eql(['date', 'Men', 'Women']);
    output[1].should.eql([1972, 36, 38]);
    output[2].should.eql([1976, 50, 50]);
    output[3].should.eql([1980, 35, 45]);
    output[4].should.eql([1984, 37, 44]);
    output[5].should.eql([1988, 41, 49]);
    output[6].should.eql([1992, 41, 45]);
    output[7].should.eql([1996, 43, 54]);
    output[8].should.eql([2000, 42, 54]);
    output[9].should.eql([2004, 44, 51]);
    output[10].should.eql([2008, 49, 56]);
    output[11].should.eql([2012, 45, 55]);
  }

  describe('loading data as Buffer', () => {
    const data = readFileSync(path);
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });

  describe('loading data as String', () => {
    const data = readFileSync(path, {encoding: 'utf8'});
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });
});

describe('parsing "UKRetail1.txt"', () => {
  const path = resolve(__dirname, 'mocks', 'UKRetail1.txt');

  function assertComments() {
    comments.should.have.lengthOf(7);
    comments[0].should.eql(['3-m']);
    comments[1].should.eql(['title', 'UK retail sales volume']);
    comments[2].should.eql(['subtitle', '% change, latest three months on same period a year earlier']);
    comments[3].should.eql(['source', 'Thomson Reuters Datastream']);
    comments[4].should.eql(['comment', 'Line chart']);
    comments[5].should.eql(['doublescale', '0']);
    comments[6].should.eql(['accumulate', 'false']);
  }

  function assertData() {
    output.should.have.lengthOf(67);
    output[0].should.eql(['date', '3-m']);
    output[1].should.eql(['15 Jan 2011', 0.068027211]);
    output[66].should.eql(['15 Jul 2016', 5.279407224]);
  }

  describe('loading data as Buffer', () => {
    const data = readFileSync(path);
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });

  describe('loading data as String', () => {
    const data = readFileSync(path, {encoding: 'ucs2'});
    const comments = extractComments(data);
    const output = cleanInput(data, comments);

    it('should be able to parse comments', () => assertComments);
    it('should be able to clean data', () => assertData);
  });
});


// New dataset template
// describe('parsing ".txt"', () => {
//   const path = resolve(__dirname, 'mocks', '.txt');
//
//   function assertComments() {
//     comments.should.have.lengthOf(8);
//     comments[0].should.eql([]);
//   }
//
//   function assertData() {
//     output.should.have.lengthOf();
//     output[0].should.eql([]);
//   }
//
//   describe('loading data as Buffer', () => {
//     const data = readFileSync(path);
//     const comments = extractComments(data);
//     const output = cleanInput(data, comments);
//
//     it('should be able to parse comments', () => assertComments);
//     it('should be able to clean data', () => assertData);
//   });
//
//   describe('loading data as String', () => {
//     const data = readFileSync(path, {encoding: 'ucs2'});
//     const comments = extractComments(data);
//     const output = cleanInput(data, comments);
//
//     it('should be able to parse comments', () => assertComments);
//     it('should be able to clean data', () => assertData);
//   });
// });
