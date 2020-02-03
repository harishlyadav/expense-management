import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Param } from './model/param';
import { ExpenseService } from './service/expense.service';
import { GetExpenseComponent } from './get-expense.component';
import EmployeeTestData from '../../../assets/test-data/employee-test-data.json';


describe('GetExpenseComponent', () => {
  let component: GetExpenseComponent;
  let fixture: ComponentFixture<GetExpenseComponent>;
  let expenseService: ExpenseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetExpenseComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ExpenseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetExpenseComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.get(ExpenseService);
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should populate employee hierarchy', async(() => {
    const actualParam = new Param('daccount1', '');
    const methodName = 'getEmployeeData';
    const employee = EmployeeTestData.find(department => department.code === actualParam.departmentCode).employee;
    spyOnProperty(component.param, 'departmentCode').and.returnValue(actualParam.departmentCode);
    spyOnProperty(component.param, 'employeeCode').and.returnValue(actualParam.employeeCode);
    spyOn(expenseService, methodName).withArgs(component.param.departmentCode, component.param.employeeCode)
                                          .and.returnValue(of(employee));
    component.ngOnInit();
    expect(component.employee.length).toBe(1);
  }));
});
