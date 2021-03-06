import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';

import {ToastrModule} from "ngx-toastr";
import { RentComponent } from './components/rent/rent.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/Update/car-update/car-update.component';
import { ColorUpdateComponent } from './components/Update/color-update/color-update.component';
import { BrandUpdateComponent } from './components/Update/brand-update/brand-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    FilterCarPipe,
    FilterBrandPipe,
    FilterColorPipe,
    RentComponent,
    PaymentComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ImageAddComponent,
    MainSliderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
