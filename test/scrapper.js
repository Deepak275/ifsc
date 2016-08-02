const expect = require("chai").expect;
const Scrapper = require('../lib/scrapper');
const utils = require('../lib/utils');
const fs = require('fs');

// Test Cases for the lib/scrapper module
describe("Scrapper", function() {

  it("init(): Intialize the class with url", function() {
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" });
    expect(s).to.have.property("scanURL", "https://www.rbi.org.in/scripts/neft.aspx");
  });

  it("fetch() method fetch the the requested link or not", function(done) {
    this.timeout(3000);
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" });
    s.fetch(() => done());
  })

  it("find(): Checks for bank details xls link.", function(done) {
    this.timeout(3000);
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" });
    s.find((err, link) => {
      expect(link).to.be.equal("https://rbidocs.rbi.org.in/rdocs/content/docs/68774.xls");
      done();
    });
  });

  it("download(): Checks if the ifsc code file is downloaded or not.", function(done) {

    var filePath = "test/ifsc_download.xls";
    if (utils.fileExists()) {
      fs.unlinkSync(filePath);
    }

    this.timeout(10000);
    let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" });
    s.download("https://rbidocs.rbi.org.in/rdocs/Content/DOCs/IFCB2009_02.xls", filePath, (err) => {
      expect(err).to.be.equal(null);
      done();
    });
  });

});
