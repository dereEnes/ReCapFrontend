import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentComponent } from './components/rent/rent.component';
import { BrandUpdateComponent } from './components/Update/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/Update/car-update/car-update.component';
import { ColorUpdateComponent } from './components/Update/color-update/color-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"cars/car/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"colors/color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"brands/brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"cars/image/add",component:ImageAddComponent,canActivate:[LoginGuard]},

  {path:"cars/car/carUpdate/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/colorUpdate/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/brandUpdate/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},

  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/:brandId/:colorId",component:CarComponent},
  {path:"cars/car/car-detail/:carId", component:CarDetailComponent},
  {path:"cars/car/rent/:carId",component:RentComponent},
  {path:"payment/:customerId",component:PaymentComponent},
  
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
