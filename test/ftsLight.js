const expect = require("chai").expect;
const Parser = require('../lib/parser');
const FullTextSearchLight = require('../lib/fullTextSearch/fullTextSearchLight');

describe('fulltextsearchlight ', function () {
  it('Test case for object not to be null or undefined ', function () {
    let p = new Parser();
    const branches = p.parse("test/ifsc.xls");
    const ftslight = new FullTextSearchLight(branches);
    const output = branches.find('mumbai', 'ftslight');
    expect(output[0][0].city).to.be.equal('MUMBAI');
  })
 })
