import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["" , Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid) {

      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(Response => {
        this.toastrService.success(Response.message);
        this.localStorageService.setItem("token",Response.data.token)
        this.userService.getFullName(loginModel.email).subscribe(Response => {
          this.localStorageService.setItem("fullName",(Response.firstName+" "+Response.lastName))
          
          
          //
          this.router.navigate([""]).then(()=>{
            location.reload();
          });
          
        })
        
      },responseError => {
        this.toastrService.warning(responseError.error)
      })
      
    } else {
      
    }
  }
   
}
