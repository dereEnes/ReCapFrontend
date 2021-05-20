import { Component, OnInit } from '@angular/core';

import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private paymentService:PaymentService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }
  createPaymentForm(){
    this.paymentForm=this.formBuilder.group({
      cardNo:["",Validators.required],
      nameOnCard:["",Validators.required],
      expityMonth:[,Validators.required],
      expityYear:[,Validators.required],
      cvCode:[,Validators.required]
      

    })
  }
  payment(){
    if(this.paymentForm.valid){
      let paymetModel:Payment=Object.assign({},this.paymentForm.value)
      
      this.paymentService.payment(paymetModel).subscribe((Response)=>{
        this.toastrService.success("Ödeme Başarılı")
      },responseError=>{
        console.log(paymetModel.expityMonth)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dogrulama hatası")
            
          }
        }
      })
    }
  }

}
