import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup;
  brandId:number;
  selectedBrand:Brand={id:0,name:""};
  
  
  constructor(private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getBrand(params["brandId"]);
        this.brandId=  parseInt(params["brandId"]);
      }
    })
  }
  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      name:["",Validators.required]
    })
  }
  getBrand(brandId:number){
    this.brandService.getBrand(brandId).subscribe(Response=>{
      this.selectedBrand=Response.data
      
    })
  }
  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel:Brand=Object.assign({},this.brandUpdateForm.value)
      brandModel.id=this.brandId;
      this.brandService.updateBrand(brandModel).subscribe(Response => {
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
