const Employee = require("./employee.js"); 

module.exports = class Intern extends Employee {
  constructor(name, id, title, school) {
    super(name, id, title);
    this.school = school;

  }
  getRole() {
    return "Intern";
  }
  getSchool() {
    return this.school
  }
}