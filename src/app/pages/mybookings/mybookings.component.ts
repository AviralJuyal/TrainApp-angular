import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Booking } from '../../models/booking';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.scss',
})
export class MybookingsComponent {
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  bookings: Booking[] = this.userService.Allbookings;

  ngOnInit() {
    const localData = localStorage.getItem('allBookings');
    if (localData) {
      this.bookings = JSON.parse(localData);
      this.userService.Allbookings = JSON.parse(localData);
    }
  }

  cancelBooking(index: number) {
    this.bookings.splice(index, 1);
    localStorage.setItem('allBookings', JSON.stringify(this.bookings));
    this.toastr.success('Booking cancelled successfully');
  }
}
