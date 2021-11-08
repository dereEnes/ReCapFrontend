import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthentication: boolean = false;
  fullName: string;


  constructor(
    private localStorageService: LocalStorageService,
    private router:Router

    ) {}

  ngOnInit(): void {
    if (this.localStorageService.getItem('token')) {
      this.isAuthentication = true;
    }
    if (this.localStorageService.getItem('fullName')) {
      this.fullName = String(this.localStorageService.getItem('fullName'));
      console.log(this.fullName);
    }
  }
  Logout() {
    this.localStorageService.deleteItem("token")
    this.localStorageService.deleteItem("fullName")
    this.localStorageService.deleteItem("email")
    this.Reload()
  }
  Reload() {
  window.location.reload();
}
hesapla(){

}

}
