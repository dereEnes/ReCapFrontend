import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      name:["",Validators.required]
    })
  }
  addBrand(){
    if(this.brandAddForm.valid){
      let colorModel:Brand=Object.assign({},this.brandAddForm.value)
      this.brandService.addBrand(colorModel).subscribe(Response=>{

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
