import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel, Station } from '../models/stations';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  apiEndpoint!: string;

  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiEndpoint;
  }

  getAllStationList(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiEndpoint}/GetAllStations`);
  }

  getAllTrains(
    departureStn: string,
    arrivalStn: string,
    date: string
  ): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      `${this.apiEndpoint}/GetTrainsBetweenStations?departureStationId=${departureStn}&arrivalStationId=${arrivalStn}&departureDate=${date}`
    );
  }
}
