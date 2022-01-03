import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDtoService } from 'src/app/services/car-dto.service';
import { ColorService } from 'src/app/services/color.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  filterText = '';
  dataListed = false;
  carsImage: CarImage[];
  brands: Brand[];
  colors: Color[];
  selectedBrand: number = 1;
  selectedColor: number = 1;
  carImagesBaseUrl = environment.carImagesBaseUrl;
  isAuthentication: boolean = false;
  constructor(
    private carsDtoService: CarDtoService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private carDetailService: CarDetailService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.getItem('token')) {
      this.isAuthentication = true;
    }
    this.getCarsImages();
    this.brandService.getBrands().subscribe((Response) => {
      this.brands = Response.data;
    });
    this.colorService.getColors().subscribe((Response) => {
      this.colors = Response.data;
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByBrandAndColorId(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCarsDetails();

      }
    });
  }
  getCarsByBrandAndColorId(brandId: number, colorId: number) {
    this.carsDtoService
      .getCarsByBrandAndColorId(brandId, colorId)
      .subscribe((Response) => {
        this.cars = Response.data;
      });
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
  Filtrele() {
    //  console.log(this.brands[this.selectedBrand].id);
    // console.log(this.colors[this.selectedColor].id);
  }
  rentACar(car: CarDto) {}
  getCarsImages() {
    this.carDetailService.getCarsImages().subscribe((Response) => {
      this.carsImage = Response.data;
    });
  }
  getCarImageUrl(id: number) {
    let car   : CarImage[] = this.carsImage.filter((c) => c.carId == id);
    if (car.length >= 1) {
      return this.carImagesBaseUrl + car[0].imagePath;  
    } else {
      return this.carImagesBaseUrl + 'default.jpg';
    }
  }
  delete(id:number){
    this.carsDtoService.deleteCar(id)
    .subscribe(response => {
      this.cars = this.cars.filter(car => car.id !== id);
    })
  }
}
