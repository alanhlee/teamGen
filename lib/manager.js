const Employee = require("./employee.js"); 

module.exports = class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email)
    this.officeNumber = officeNumber
  }
  getRole() {
    return 'Manager'
  }
  getOfficeNumber() {
    return this.officeNumber
  }
}
