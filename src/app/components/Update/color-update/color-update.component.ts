import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup;
  selectedColor:Color={id:0,name:""};
  colorId:number;
  constructor(
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"]){
        this.getBrand(params["colorId"]);
        this.colorId=  parseInt(params["colorId"]);
      }
    })
  }
  getBrand(colorId:number){
    this.colorService.getColor(colorId).subscribe(Response=>{
      this.selectedColor=Response.data
    })
  }
  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      name:["",Validators.required]
    })
  }
  updateColor(){
    if (this.colorUpdateForm.valid) {
      let colorModel:Color=Object.assign({},this.colorUpdateForm.value)
      colorModel.id=this.colorId;
      this.colorService.updateColor(colorModel).subscribe(Response => {
        this.toastrService.success("Renk güncellendi.");
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
