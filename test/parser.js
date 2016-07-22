var expect = require("chai").expect;
var Parser = require('../lib/parser')

describe("Parser", function() {

  it("init()", function() {
    let p = new Parser({})
    expect(p).to.not.be.null
  })

  it("parse()", function() {
    let p = new Parser({})
    branches = p.parse("test/ifsc.xls")
    expect(branches.branches.length).to.be.equal(4)
  })

  it("find()", function() {
    this.timeout(30000)
    let p = new Parser()
    branches = p.parse("test/ifsc.xls")
    // branches = p.parse("68774.xls")
    // console.time("find")
    found = branches.find("mumbai wadia bail")
    // console.timeEnd("find")
    expect(found.length).to.be.equal(1)
  })

})
