import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService
    ) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }
  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
    name:["",Validators.required]
    }) 
  }
  addColor(){
    if(this.colorAddForm.valid){
      let colorModel:Color=Object.assign({},this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(Response=>{

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
