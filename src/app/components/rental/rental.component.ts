import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalDtoService } from 'src/app/services/rental-dto.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalDetails:RentalDto[]=[];
  
  constructor(private rentalDtoService:RentalDtoService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }
  
  getRentalDetails(){
    this.rentalDtoService.getRentalDetails().subscribe(Response=>{
      this.rentalDetails=Response.data;
    })
  }
  
}
