import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
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
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  handleClick(brand:any){
    console.log(brand.id);
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      console.log(this.brands)
      this.dataLoaded=true;

    })
  }
}
