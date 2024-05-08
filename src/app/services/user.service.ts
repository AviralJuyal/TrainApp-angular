import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/stations';
import { map, Observable, Subject } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userInfo = new Subject<User>();

  Allbookings: Booking[] = [];

  currentBooking!: Booking;

  apiEndpoint!: string;

  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiEndpoint;
  }

  registerUser(data: User) {
    return this.http.post<ResponseModel>(
      this.apiEndpoint + '/AddUpdatePassengers',
      JSON.stringify(data)
    );
  }

  loginUser(data: User) {
    return this.http.post<ResponseModel>(
      this.apiEndpoint + '/Login',
      JSON.stringify(data)
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('userData');
  }
}
