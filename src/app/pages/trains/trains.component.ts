import { Component } from '@angular/core';
import { ResponseModel, Station } from '../../models/stations';
import { ActivatedRoute, Router } from '@angular/router';
import { StationsService } from '../../services/stations.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Train } from '../../models/train';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.scss',
})
export class TrainsComponent {
  trainsList: Train[] = [];
  stationList: Station[] = [];

  selectedTrain!: Train;

  fromStation!: string;
  toStation!: string;

  date!: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stationService: StationsService,
    private toastr: ToastrService
  ) {}

  handleSelectTrain(train: Train) {
    this.selectedTrain = train;
  }

  loadStation() {
    this.stationService.getAllStationList().subscribe((res: ResponseModel) => {
      this.stationList = res.data;

      const queryData = this.route.snapshot.queryParamMap;

      this.toStation = res.data.find(
        (e: any) => e.stationID == queryData.get('toStn')
      )?.stationID;

      this.fromStation = res.data.find(
        (e: any) => e.stationID == queryData.get('fromStn')
      )?.stationID;

      this.date = queryData.get('date');
    });
  }

  ngOnInit() {
    this.loadStation();
    this.getAllTrains();
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

  getAllTrains() {
    this.stationService
      .getAllTrains(
        this.fromStation,
        this.toStation,
        this.date ? this.date || this.date : ''
      )
      .subscribe((res) => {
        if (res.data.length === 0) {
          this.trainsList = environment.AllTrains;
        }
      });
  }
}
