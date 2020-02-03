export class Param {
    deptCode: string;
    empCode: string;
    constructor(departmentCode: string = '' , employeeCode: string = '') {
      this.deptCode = departmentCode;
      this.empCode = employeeCode;
    }
    get departmentCode() {
      return `${this.deptCode}`;
    }
    get employeeCode() {
        return `${this.empCode}`;
      }
}
