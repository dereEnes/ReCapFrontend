import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDtoService } from 'src/app/services/car-dto.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  constructor(
    private carService:CarDtoService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }
  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:[,Validators.required],
      colorId:[,Validators.required],
      modelYear:[,Validators.required],
      dailyPrice:[,Validators.required],
      description:["",Validators.required]
    })
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel:Car=Object.assign({},this.carAddForm.value)
      this.carService.addCar(carModel).subscribe(Response=>{
        this.toastrService.success("Araç başarılı bir şekilde eklendi.")
      },responseError=>{
        if(responseError.error.Errors.length>0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              
            }
        }
        
      })
    }
  }

}
