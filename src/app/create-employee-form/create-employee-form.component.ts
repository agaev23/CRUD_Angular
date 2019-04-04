import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServerGetterService} from '../server-getter.service';

@Component({
  selector: 'app-create-employee-form',
  templateUrl: './create-employee-form.component.html',
  styleUrls: ['./create-employee-form.component.scss']
})
export class CreateEmployeeFormComponent implements OnInit {

  @Input() currentEmployee;
  @Output() closeForm = new EventEmitter();

  constructor(public serverGetterService: ServerGetterService) {
  }

  public formGroup: FormGroup;
  public isPreloaderShown;

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(this.currentEmployee.firstName, Validators.required),
      lastName: new FormControl(this.currentEmployee.lastName, Validators.required),
      birthDay: new FormControl(this.currentEmployee.birthDay, Validators.required),
      gender: new FormControl(this.currentEmployee.gender, Validators.required),
      available: new FormControl(this.currentEmployee.available),
      salary: new FormControl(this.currentEmployee.salary * 1, [Validators.required, Validators.min(0)]),
      tax: new FormControl(this.currentEmployee.tax * 100, [Validators.required, Validators.max(100), Validators.min(0)]),
    });

  }

  addEmployee() {
    this.isPreloaderShown = true;
    this.formGroup.value.tax = this.formGroup.value.tax / 100;
    this.serverGetterService.post('employees', this.formGroup.value).subscribe(
      () => {
        this.closeHandler();
        this.isPreloaderShown = false;
      },
      () => {
        alert('something went wrong(');
      }
    );
  }

  closeHandler() {
    this.closeForm.emit();
  }

  editEmployee() {
    this.isPreloaderShown = true;
    this.formGroup.value.tax = this.formGroup.value.tax / 100;
    this.serverGetterService.update('employees/', this.currentEmployee.id, this.formGroup.value).subscribe(
      () => {
        this.closeHandler();
        this.isPreloaderShown = false;
      },
      () => {
        alert('something went wrong(');
      }
    );
  }

  round(value: number) {
    return value.toFixed(2);
  }
}
