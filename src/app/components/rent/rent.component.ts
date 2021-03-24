import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { RentalDtoService } from 'src/app/services/rental-dto.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentalAddForm:FormGroup;
  customers:Customer[];
  customerId:number;

  constructor(private customerService:CustomerService,
      private rentalDtoService:RentalDtoService,
      private formBuilder:FormBuilder,
      private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.GetCustomers();
    console.log(this.customerId);
    this.createRentalAddForm();
  }

  GetCustomers(){
    this.customerService.getCustomers().subscribe((Response)=>{
      this.customers=Response.data
    })
  }
  deneme(){
    console.log(this.customerId)
  }
  getSelectedCustomer(id:number){
    if(id==this.customers[0].id){
      return "true";
    }else{
      return "false";
    }
  }
  getReturnDateDisable(){
    return "yes";
  }


  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
    customerId:[,Validators.required],
    carId:[,Validators.required],
    rentDate:[,Validators.required],
    returnDate:[,]
    }) 
  }

  addRental(){
    if(this.rentalAddForm.valid){
      let rentalModel=Object.assign({},this.rentalAddForm.value)
      this.rentalDtoService.addRental(rentalModel).subscribe(Response=>{

        this.toastrService.success("Başarılı")


      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dogrulama hatası")
            
          }
        }
      })
    }
    
  }

}
