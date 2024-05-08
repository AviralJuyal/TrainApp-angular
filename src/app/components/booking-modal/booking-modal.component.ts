import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Train } from '../../models/train';

declare var bootstrap: any;

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.scss',
})
export class BookingModalComponent {
  @Input() selectedTrain!: Train;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  passengers: User[] = [
    {
      firstName: '',
      lastName: '',
      email: null,
      passengerID: null,
      password: null,
      phone: '',
    },
  ];

  userDetails!: User;

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '');
  }

  closeModal(): void {
    let modalElement = document.getElementById('bookingModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  handleSubmit() {
    let flag = false;
    for (let e of this.passengers) {
      if (e.firstName === '' || e.lastName === '' || e.email === '') {
        flag = true;
        break;
      }
    }
    if (flag) {
      this.toastr.error('Please enter all details');
      return;
    }
    let amount = this.passengers.length * 5;
    const date = new Date();

    this.userService.currentBooking = {
      passengers: this.passengers,
      bookingId: Date.now(),
      time: date.toISOString(),
      totalAmount: amount,
      Destination: this.selectedTrain.Destination,
      Source: this.selectedTrain.Source,
      TrainName: this.selectedTrain.TrainName,
    };

    localStorage.setItem(
      'currentBooking',
      JSON.stringify({
        passengers: this.passengers,
        bookingId: Date.now(),
        time: date.toISOString(),
        totalAmount: amount,
        Destination: this.selectedTrain.Destination,
        Source: this.selectedTrain.Source,
        TrainName: this.selectedTrain.TrainName,
      })
    );
    this.router.navigateByUrl('/checkout');
    this.closeModal();
  }

  addPassenger() {
    this.passengers.push({
      firstName: '',
      lastName: '',
      email: null,
      passengerID: null,
      password: null,
      phone: '',
    });
  }

  deletePassenger(index: number) {
    this.toastr.clear();
    if (this.passengers.length === 1) {
      this.toastr.error('At least one passenger must be there');
      return;
    }
    this.toastr.success('Passenger deleted successfully');
    this.passengers.splice(index, 1);
  }
}
