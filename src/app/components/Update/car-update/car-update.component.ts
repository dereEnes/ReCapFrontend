import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDtoService } from 'src/app/services/car-dto.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  selectedCar:Car={id:0,brandId:0,colorId:0,description:"",modelYear:0,dailyPrice:0};
  carId:number;
  constructor(
    private activatedRoute:ActivatedRoute,
    private carService:CarDtoService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCar(params["carId"]);
        this.carId=  parseInt(params["carId"]);
      }
    })
  }
  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      brandId:[,Validators.required],
      colorId:[,Validators.required],
      modelYear:[,Validators.required],
      dailyPrice:[,Validators.required],
      description:["",Validators.required]
    })
  }
  getCar(carId:number){
    this.carService.getCar(carId).subscribe(Response=>{
      this.selectedCar=Response.data
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel:Car=Object.assign({},this.carUpdateForm.value)
      carModel.id=this.carId;
      this.carService.updateCar(carModel).subscribe(Response => {
        this.toastrService.success("Marka güncellendi");
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
