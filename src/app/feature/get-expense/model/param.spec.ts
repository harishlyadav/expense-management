import { Param } from './param';

xdescribe('Param', () => {
  it('should create an instance', () => {
    const departmentCode = '';
    const employeeCode = '';
    expect(new Param(departmentCode, employeeCode)).toBeTruthy();
  });
});
