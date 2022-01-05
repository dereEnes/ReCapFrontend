import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddCarImageModel } from 'src/app/models/image';
import { ImageAddService } from 'src/app/services/image-add.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  imageAddForm: FormGroup
  imgFile:string;
  selectedFile = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private imageAddService: ImageAddService,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.imageAddForm = this.formBuilder.group({
      carId: [,Validators.required],
      imageFile: ['',Validators.required]
    })
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageAddForm.get('imageFile')?.setValue(file)
      console.log(event);
      this.imgFile = file
      
      
    }
  }
  

  onSubmit() {
    if(!this.imageAddForm.valid){
      this.toastrService.warning("Lütfen alanların doldurunuz!")
      return
    }
    const formData = new FormData();
    formData.append('imageFile', this.imageAddForm.get('imageFile')?.value);
    formData.append('carId', this.imageAddForm.get('carId')?.value);

    this.imageAddService.addImage(formData).subscribe(Response => {
      this.toastrService.success("Resim başarıyla eklendi.")
    },responseError => {
      if(responseError.error.Errors.length > 0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }
      }
    });
    
  }
}
