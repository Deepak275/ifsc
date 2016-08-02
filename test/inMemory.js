const expect = require("chai").expect;
const Parser = require('../lib/parser');

describe('inMemory', function () {

  //checks that intialize value is neither null or undefined.
  it('Intialized object should not equal null or undefined', function () {
    let p = new Parser();
    expect(p).to.exist;
  })

 // checks for the string search results
  it('find() mehthod should fetch all matching branches', function () {
    let p = new Parser();
    const branches = p.parse("test/ifsc.xls");
    const output = branches.find("mumbai",'');
    expect(output).to.be.not.null
    expect(output[0].city).to.be.equal('MUMBAI');
  });
});
