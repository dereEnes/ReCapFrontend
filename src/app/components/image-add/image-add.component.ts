import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Image } from 'src/app/models/image';
import { ImageAddService } from 'src/app/services/image-add.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  imageAddForm: FormGroup
  imgFile:string;
  selectedFile = null;

  uploadForm = new FormGroup({
    carId: new FormControl( [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });



  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private imageAddService: ImageAddService
    ) { }

  ngOnInit(): void {}

  get uf(){
    return this.uploadForm.controls;
  }
 

  onFileSelected(e: any){
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });
   
      };
    }
  }
  

  
  
  addImage(){
    console.log(this.uploadForm.value);
    if (this.imageAddForm.valid && this.selectedFile != null){
      let imageModel: Image = Object.assign({}, this.imageAddForm.value)
      this.imageAddService.addImage(imageModel).subscribe(Response => {
        this.toastrService.success('Araç resmi veritabanına eklendi');
      }, responseError => {
        console.log('hata');
        if (responseError.console.error.Errors.length > 0)
        {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Dogrulama hatası');

          }
        }
      });
    }
  }
}
