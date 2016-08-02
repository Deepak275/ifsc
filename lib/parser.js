const xlsx = require("xlsx");
const Branch = require("../model/branch");
const Branches = require("../model/branches");

class Parser {

  constructor(options) {

  }

  parse(file, cb) {
    let branches = new Branches();
    let data = xlsx.readFile(file);
    for (let sheet in data.Sheets) {
      let branch = {};
      for (let cell in data.Sheets[sheet]) {
        switch (cell.charAt(0)) {
          case 'A':
            branch.bank = data.Sheets[sheet][cell].v;
            break;
          case 'B':
            branch.ifsc = data.Sheets[sheet][cell].v;
            break;
          case 'C':
            branch.micr = data.Sheets[sheet][cell].v;
            break;
          case 'D':
            branch.branch = data.Sheets[sheet][cell].v;
            break;
          case 'E':
            branch.address = data.Sheets[sheet][cell].v;
            break;
          case 'F':
            branch.contact = data.Sheets[sheet][cell].v;
            break;
          case 'G':
            branch.city = data.Sheets[sheet][cell].v;
            break;
          case 'H':
            branch.district = data.Sheets[sheet][cell].v;
            break;
          case 'I':
            branch.state = data.Sheets[sheet][cell].v;

            // Create a branch object out of it
            let b = new Branch({bank: branch.bank, ifsc: branch.ifsc, micr: branch.micr, branch: branch.branch, address: branch.address, contact: branch.contact, city: branch.city, district: branch.district, state: branch.state});

            // Add it to branches
            branches.add(b);

            // Break out
            break;
          default:
            break;
        }
      }
    }
    return branches;
  }

}

module.exports = Parser;
