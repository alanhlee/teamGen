import Employee from "./employee.js";

export default class Intern extends Employee {
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
