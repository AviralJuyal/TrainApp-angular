import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/stations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainsService {
  apiEndpoint!: string;

  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiEndpoint;
  }

  getTrainsBetweenStn(
    departureStationId: number,
    arrivalStationId: number,
    departureDate: string
  ): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      this.apiEndpoint +
        `/GetTrainsBetweenStations?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}`
    );
  }
}
