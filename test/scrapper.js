var expect = require("chai").expect;
var Scrapper = require('../lib/scrapper')

describe("Scrapper", function() {

  it("init() with url", function() {
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" })
    expect(s).to.have.property("scanURL", "https://www.rbi.org.in/scripts/neft.aspx")
  })

  it("fetch()", function(done) {
    this.timeout(3000)
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" })
    s.fetch(() => done())
  })

  it("find()", function(done) {
    this.timeout(3000)
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" })
    s.find((err, link) => {
      expect(link).to.be.equal("https://rbidocs.rbi.org.in/rdocs/content/docs/68774.xls")
      done()
    })
  })

  it("download()", function(done) {
    this.timeout(10000)
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" })
    s.download("https://rbidocs.rbi.org.in/rdocs/Content/DOCs/IFCB2009_02.xls", (err) => {
      expect(err).to.be.equal(null)
      done()
    })
  })

})
