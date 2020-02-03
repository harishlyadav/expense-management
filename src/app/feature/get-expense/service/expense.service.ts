import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../model/employee';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  employee: Employee;
  DATA_URL = 'assets/management.json';
  constructor(private httpClient: HttpClient) {}

  /**
   * Returns the observable for employee .
   *
   * @remarks
   * This method is part of Expense Service.
   *
   * @param departmentCode - department code
   * @param employeeCode - employee code
   * @returns employee observable
   *
   */
  getEmployeeData(departmentCode: string, employeeCode: string = ''): Observable<Employee> {
    return this.httpClient.get<Department[]>(this.DATA_URL).pipe(
      map(response => {
        const department = response.find(data => data.code === departmentCode);
        if (employeeCode !== '') {
          return this.searchEmployee(department.employee, employeeCode);
        }
        return department.employee;
      }),
      catchError(this.errorHandler)
    );
  }

  /**
   * Returns the empty observable for employee .
   *
   * @remarks
   * This method is part of Expense Service.
   *
   * @param error - error occured
   * @returns empty observable
   *
   */
  errorHandler(error: Error): Observable<never> {
    return throwError(error.message);
  }

  /**
   * Returns the employee hierarchy of employee.
   *
   * @remarks
   * This method is part of Expense Service.
   *
   * @param employee - employee data
   * @param employeeCode - employee code to search against
   * @returns employee hierarchy
   *
   */
  searchEmployee(employee: Employee, employeeCode: string): Employee {
    if (employee && employee.code === employeeCode) {
      return employee;
    } else if (employee && employee.employee != null) {
      let result: Employee;
      for (const item of employee.employee) {
        if (result === null || result === undefined) {
          result = this.searchEmployee(item, employeeCode);
        }
      }
      return result;
    }
  }

  /**
   * Returns the expenses allocated for department or manager in respective department .
   *
   * @remarks
   * This method is part of Expense Service.
   *
   * @param employee - employee data
   * @returns department's or manager's allocated expense
   *
   */
  calculateExpense(employee: Employee): number {
    let totalAllocation = 0;
    if (employee && employee.role !== null) {
      totalAllocation = employee.role.allocation;
    }
    if (employee && employee.employee !== null) {
      for (const item of employee.employee) {
        totalAllocation += this.calculateExpense(item);
      }
    }
    return totalAllocation;
  }
}
