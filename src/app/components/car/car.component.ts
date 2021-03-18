import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDtoService } from 'src/app/services/car-dto.service';

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
  constructor(
    private carsDtoService: CarDtoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCarsDetails();
      }
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
  
  

}
