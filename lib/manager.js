import Employee from "./employee.js";

export default class Manager extends Employee {
  constructor(name, id, title, officeNumber) {
    super(name, id, title)
    this.officeNumber = officeNumber
  }
  getRole() {
    return 'Manager'
  }
}
