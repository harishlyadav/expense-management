import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GetExpenseRoutingModule } from './get-expense-routing.module';
import { ExpenseService } from './get-expense/service/expense.service';

@NgModule({
  declarations: [GetExpenseRoutingModule.components],
  imports: [CommonModule, HttpClientModule, GetExpenseRoutingModule],
  providers: [ExpenseService]
})
export class GetExpenseModule {}
