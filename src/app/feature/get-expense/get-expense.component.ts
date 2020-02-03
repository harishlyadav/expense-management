import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseService } from './service/expense.service';
import { Employee } from './model/employee';
import { Param } from './model/param';

@Component({
  selector: 'app-get-expense',
  templateUrl: './get-expense.component.html',
  styleUrls: ['./get-expense.component.scss']
})
export class GetExpenseComponent implements OnInit, OnDestroy {
  employee: Employee[] = [];
  expense: number;
  param: Param = new Param('dsales1');

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    /**
     * considering the param object would be fill by UI, may be dropdown passing department code & employee code (optional)
     */
    this.getEmployee({ departmentCode: this.param.departmentCode, employeeCode: this.param.employeeCode });
  }

  /**
   * Returns the Hierarchy of employee .
   *
   * @remarks
   * This method is part of Expense Component.
   *
   * @param departmentCode - unique department code
   * @param employeeCode - unique employee code
   * @returns hierarchy of employee
   *
   */
  getEmployee({ departmentCode, employeeCode }: { departmentCode: string; employeeCode: string }): void {
    this.expenseService.getEmployeeData(departmentCode, employeeCode).subscribe(
      data => {
        this.employee.push(data);
      },
      () => {},
      () => {
        this.expense = this.expenseService.calculateExpense(this.employee[0]);
      }
    );
  }

  ngOnDestroy() {}
}
