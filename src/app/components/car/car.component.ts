import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';
import { CarDtoService } from 'src/app/services/car-dto.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:CarDto[]=[];
  dataListed=false;
  constructor(private carsDetails:CarDtoService) { }

  ngOnInit(): void {
    this.getCarsDetails();
  }
  
  getCarsDetails(){
    this.carsDetails.getCarsDetails().subscribe(response=>{
      this.cars=response.data
      this.dataListed=true;
    });
  }
}
