var expect = require("chai").expect;
var Parser = require('../lib/parser')

describe("Parser", function() {

  it("init()", function() {
    let p = new Parser({})
    expect(p).to.not.be.null
  })

  it("parse()", function() {
    this.timeout(40000)
    let p = new Parser({})
    branches = p.parse("test/ifsc.xls")
    // branches = p.parse("68774.xls")
    expect(branches.branches.length).to.be.equal(4)
  })

})
