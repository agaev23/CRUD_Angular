import {Component, OnInit} from '@angular/core';
import {ServerGetterService} from '../server-getter.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public employees;
  public currentEmployee = {
    available: '',
    birthDay: '',
    firstName: '',
    gender: '',
    lastName: '',
    salary: '',
    tax: '',
  };
  public isFormOpen = false;

  constructor(public serverGetter: ServerGetterService) {
  }

  ngOnInit() {
    this.updateTable();
  }

  updateTable() {
    this.serverGetter.get('employees').subscribe(
      (resp) => {
        this.employees = resp;
      },
      () => {
        alert('something went wrong(');
      }
    );
  }

  openForm(action: string, currentEmployee) {
    this.isFormOpen = true;
    if (action === 'add') {
      this.currentEmployee = {
        available: '',
        birthDay: '',
        firstName: '',
        gender: '',
        lastName: '',
        salary: '',
        tax: '',
      };
      return;
    }
    this.currentEmployee = currentEmployee;
  }

  closeForm() {
    this.isFormOpen = false;
    this.updateTable();
  }

  removeEmployee(id: number) {
    this.serverGetter.remove('employees/', id).subscribe(
      () => {
        this.updateTable();
      },
      () => {
        alert('something went wrong(');
      }
    );
  }

  public changeDateFormat(data: string) {
    return data.replace(/(\d*)-(\d*)-(\d*)/, '$3.$2.$1');
  }
}
