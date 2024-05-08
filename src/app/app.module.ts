import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TrainsComponent } from './pages/trains/trains.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { TrainCardComponent } from './components/train-card/train-card.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MybookingsComponent } from './pages/mybookings/mybookings.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrainsComponent,
    AdminComponent,
    NavbarComponent,
    NotFoundComponent,
    RegisterModalComponent,
    LoginModalComponent,
    TrainCardComponent,
    MybookingsComponent,
    BookingModalComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  // providers: [UserService, TrainsService],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
