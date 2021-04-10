import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]=[];
  dataLoaded=false;
  filterText="";
  isAuthentication=false;
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
    if(localStorage.getItem("token")){
      this.isAuthentication = true;
    }else{
      this.isAuthentication = false;
    }
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
  setCurrentColor(color:Color){

  }
}
