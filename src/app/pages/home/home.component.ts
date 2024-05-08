import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StationsService } from '../../services/stations.service';
import { ResponseModel, Station } from '../../models/stations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  stationList: Station[] = [];
  date!: string;

  fromStation!: string;
  toStation!: string;

  constructor(
    private stationService: StationsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // stationList$: Observable<any> = this.stationService.getAllStationList();

  ngOnInit() {
    this.loadStation();
  }

  loadStation() {
    // this.stationService.getAllStationList().subscribe((res: ResponseModel) => {
    //   this.stationList = res.data;
    // });
    this.stationList = environment.AllStations;
  }

  searchTrains() {
    if (!this.fromStation || !this.toStation) {
      this.toastr.error('Please select a station');
    } else if (!this.date) this.toastr.error('Please select a date');
    else {
      this.router.navigateByUrl(
        `/trains?fromStn=${this.fromStation}&toStn=${this.toStation}&date=${this.date}`
      );
    }
  }
}
