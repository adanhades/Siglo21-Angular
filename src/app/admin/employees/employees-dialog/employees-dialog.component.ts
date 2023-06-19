import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.scss']
})
export class EmployeesDialogComponent implements OnInit {
  public form!: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<EmployeesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0, 
      username: ['', Validators.required],
      email: null,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: null,
      storeId: null,  
      walletBalance: null, 
      revenue: null,
      billing: this.fb.group({ 
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: '',
        company: '',
        email: ['', Validators.required],
        phone: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: '',
        zip: ['', Validators.required],
        address: ['', Validators.required]
      }) 
    }); 

    if(this.data.customer){
      this.form.patchValue(this.data.customer); 
    };
  }

  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

  public compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.code == o2.code);
  }

}
