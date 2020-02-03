import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Param } from '../model/param';
import { ExpenseService } from './expense.service';
import ManagementActualData from '../../../../assets/management.json';
import EmployeeTestData from '../../../../assets/test-data/employee-test-data.json';
import EmployeeTestHierarchy from '../../../../assets/test-data/employee-test-hierarchy.json';

describe('ExpenseService', () => {
  let injector: TestBed;
  let service: ExpenseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpenseService]
    });
    injector = getTestBed();
    service = injector.get(ExpenseService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  it('should mock the http request', async(() => {
    const actualParam = new Param('dsales1');
    const expectedParam = new Param('daccount1');
    const notExpectedEmployee = ManagementActualData.find(department => department.code === actualParam.departmentCode)
      .employee;
    service.getEmployeeData(expectedParam.departmentCode, expectedParam.employeeCode).subscribe(employee => {
      expect(employee.code).not.toEqual(notExpectedEmployee.code);
      expect(employee.name).not.toEqual(notExpectedEmployee.name);
      expect(employee.employee).not.toEqual(notExpectedEmployee.employee);
    });
    const req = httpMock.expectOne('assets/management.json');
    expect(req.request.method).toBe('GET');
    req.flush(EmployeeTestData);
  }));

  it('should return employee hierarchy', async(() => {
    const actualParam = new Param('daccount1', 'mmitchell4');
    const actualemployee = service.searchEmployee(EmployeeTestData[0].employee, actualParam.employeeCode);
    expect(actualemployee).toEqual(EmployeeTestHierarchy);
  }));

  it('should calculate department/employee expense', async(() => {
    const expectedExpense = 2300;
    const actualExpense = service.calculateExpense(EmployeeTestHierarchy);
    expect(actualExpense).toEqual(expectedExpense);
  }));

  it('should return undefined for invalid employee code', async(() => {
    const actualParam = new Param('daccount1', 'mmitchell44');
    const employee = service.searchEmployee(EmployeeTestData[0].employee, actualParam.employeeCode);
    expect(employee).toBeUndefined();
  }));

  it('should return error message for empty/invalid department code', async(() => {
    const actualParam = new Param();
    const expectedMessage = 'Cannot read property ' + "'employee'" + ' of undefined';
    service.getEmployeeData(actualParam.departmentCode, actualParam.employeeCode).subscribe(
      () => {},
      errorData => {
        expect(errorData).toMatch(expectedMessage);
      }
    );
    const req = httpMock.expectOne('assets/management.json');
    expect(req.request.method).toBe('GET');
    req.flush(EmployeeTestData);
  }));
});
