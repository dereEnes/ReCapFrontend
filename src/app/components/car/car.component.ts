import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDtoService } from 'src/app/services/car-dto.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  filterText="";
  dataListed = false;
  carImage:CarImage[];
  brands:Brand[];
  colors:Color[];
  selectedBrand:number=1;
  selectedColor:number=1;


  constructor(
    private carsDtoService: CarDtoService,
    private activatedRoute: ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe((Response)=>{
      this.brands=Response.data;
    })
    this.colorService.getColors().subscribe((Response)=>{
      this.colors=Response.data
    })
     this.activatedRoute.params.subscribe((params) => {
    if(params["brandId"] && params["colorId"]){
      this.getCarsByBrandAndColorId(params["brandId"] , params["colorId"]);
    }else if (params['brandId']) {
        
         this.getCarsByBrand(params['brandId']);
       } else if (params['colorId']) {
        
         this.getCarsByColor(params['colorId']);
       } else {
         this.getCarsDetails();
      }
    });
  }
  getCarsByBrandAndColorId(brandId:number,colorId:number){
    
    this.carsDtoService.getCarsByBrandAndColorId(brandId,colorId).subscribe((Response)=>{
      this.cars=Response.data;
    })
  }
  getCarsDetails() {
    this.carsDtoService.getCarsDetails().subscribe((response) => {
      this.cars = response.data;

      this.dataListed = true;
    });
  }
  getCarsByBrand(id: number) {
    this.carsDtoService.getCarsByBrand(id).subscribe((Response) => {
      this.cars = Response.data;
    });
  }
  getCarsByColor(id: number) {
    this.carsDtoService.getCarsByColor(id).subscribe((Response) => {
      this.cars = Response.data;
    });
  }
  Filtrele(){
  //  console.log(this.brands[this.selectedBrand].id);
   // console.log(this.colors[this.selectedColor].id);
  }
  rentACar(car:CarDto){
    
    this.toastrService.success("Başarılı");
  }
  

}
