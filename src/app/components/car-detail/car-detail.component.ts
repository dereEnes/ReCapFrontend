import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDtoService } from 'src/app/services/car-dto.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carDtoService:CarDtoService
  ) {}
  carImagesBaseUrl: string = 'https://localhost:44340/uploads/';
  carImages: CarImage[];
  carDetails:CarDto[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImages(params['carId']);
        this.getCarDetailsById(params['carId']);
      }
    });
  }
  getCarDetailsById(carId:number){
    this.carDtoService.getCarDetailsById(carId).subscribe((Response) => {
      this.carDetails=Response.data;
    });
  }
  getCarImages(carId: Number) {
    this.carDetailService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  public getUrl(url: string) {
    return this.carImagesBaseUrl + url;
  }
  getCorouselClass(car: CarImage) {
    if (car == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
}
