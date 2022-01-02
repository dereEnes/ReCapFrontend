import { Component, OnInit } from '@angular/core';


import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;


  constructor(

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }
  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      cardNo: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      expityMonth: ['', Validators.required],
      expityYear: ['', Validators.required],
      cvCode: ['', Validators.required]


    });
  }
  payment(){
    console.log('1');
    if (this.paymentForm.valid){
      let paymetModel: Payment = Object.assign({}, this.paymentForm.value);
      paymetModel.amount = 1;
      paymetModel.customerEmail = "enes@gmail.com"; //this.localStorageService.getItem("email");

      this.paymentService.payment(paymetModel).subscribe((Response) => {
        this.toastrService.success("Ödeme Başarılı");
      }, responseError => {
        console.log(paymetModel.expityMonth);
        if (responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Dogrulama hatası");

          }
        }
      });
    }
  }

}
