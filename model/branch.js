class Branch {
  constructor(options) {

    if (options.ifsc == "IFSC") {
      return
    }

    this.bank = options.bank
    this.ifsc = options.ifsc
    this.micr = options.micr
    this.branch = options.branch
    this.address = options.address
    this.contact = options.contact
    this.city = options.city
    this.district = options.district
    this.state = options.state

    this.searchString = this.bank + " " + this.ifsc + " " + this.micr + " " + this.branch + " " + this.address + " " + this.contact + " " + this.city + " " + this.district + " " + this.state
  }
}

module.exports = Branch
