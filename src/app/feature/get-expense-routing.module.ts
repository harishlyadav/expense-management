import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetExpenseComponent } from './get-expense/get-expense.component';

const routes: Routes = [
  { path: '', redirectTo: 'getexpense', pathMatch: 'full' },
  { path: 'getexpense', component: GetExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetExpenseRoutingModule {
  static components = [GetExpenseComponent];
}
