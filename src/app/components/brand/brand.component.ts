import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { CarDtoService } from 'src/app/services/car-dto.service';
import { ColorService } from 'src/app/services/color.service';
import { CarComponent } from '../car/car.component';
import { RentalComponent } from '../rental/rental.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  //providers:[BrandService]
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      //console.log(this.brands)
     // this.dataLoaded=true;

    })
  }
  setCurrentBrand(brand:Brand){
    
  }
}
