import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { CarDtoService } from 'src/app/services/car-dto.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  //providers:[BrandService]
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;
  constructor(private brandService:BrandService,
    private carDtoService:CarDtoService
    ) { }

  ngOnInit(): void {
    this.getBrands();
  }
  handleClick(brand:any){
    this.carDtoService.getByBrand(brand.id)
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      //console.log(this.brands)
     // this.dataLoaded=true;

    })
  }
}
