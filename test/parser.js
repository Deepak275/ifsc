const expect = require("chai").expect;
const Parser = require('../lib/parser');

// Test Cases for the lib/parser module.
describe("Parser", function() {

  it("init() to be not null", function() {
    let p = new Parser({});
    expect(p).to.not.be.null;
  });

  it("Parse() result branches property length equal to 4", function() {
    let p = new Parser({});
    const branches = p.parse("test/ifsc.xls");
    expect(branches.branches.length).to.be.equal(4);
  });

  it("Result of find() has length equal to 1", function() {
    this.timeout(30000);
    let p = new Parser();
    const branches = p.parse("test/ifsc.xls");
    // branches = p.parse("68774.xls")
    // console.time("find");
    found = branches.find("mumbai wadia bail");
    // console.timeEnd("find")
    expect(found.length).to.be.equal(1);
  });

});
