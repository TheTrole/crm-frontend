import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipelineContactsService } from '../services/pipeline-contacts.service';
import { Customer } from '../models/customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pipelineService: PipelineContactsService
  ) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: [''],
      date: [''],
      email: ['']
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const newCustomer: Customer = {
        _id: '', // Generate or assign an ID
        ...this.customerForm.value
      };

      // Assuming PipelineContactsService has a method to add a customer
      this.pipelineService.addCustomer(newCustomer).subscribe(
        {
          next: (res) => {
            console.log('Customer added successfully');
            alert('Customer added successfully');
            this.customerForm.reset();
          },
          error: (err:HttpErrorResponse)=>{
            console.error('Error adding customer:', err);
          }
        }
      )
    }
  }

}
