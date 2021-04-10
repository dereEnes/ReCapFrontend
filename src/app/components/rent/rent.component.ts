import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalDtoService } from 'src/app/services/rental-dto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  rentalAddForm: FormGroup;
  customers: Customer[];
  customerId: number;
  carId: number;
  constructor(
    private customerService: CustomerService,
    private rentalDtoService: RentalDtoService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId'];
    });
    this.GetCustomers();
    console.log(this.customerId);
    this.createRentalAddForm();
  }

  GetCustomers() {
    this.customerService.getCustomers().subscribe((Response) => {
      this.customers = Response.data;
    });
  }
  deneme() {
    console.log(this.customerId);
  }
  getSelectedCustomer(id: number) {
    if (id === 0) {
      return 'true';
    } else {
      return 'false';
    }
  }
  getReturnDateDisable() {
    return 'yes';
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: [, Validators.required],
      carId:[, Validators.required],
      rentDate: [, Validators.required],
      returnDate: [,]
    });
  }

  addRental() {
    
     if(this.rentalAddForm.valid){

       let rentalModel:Rental=Object.assign({},this.rentalAddForm.value)
       rentalModel.customerId=Number(rentalModel.customerId)
       rentalModel.carId=Number(rentalModel.carId)

       this.rentalDtoService.addRental(rentalModel).subscribe(Response=>{
         this.toastrService.success("Başarılı")
        this.route.navigate(["payment"])

       },responseError=>{
         this.toastrService.error(responseError.error.message)
       })
     }else{
       this.toastrService.error("Lütfen bilgileriniz kontrol ediniz!");
     }
  }
}
