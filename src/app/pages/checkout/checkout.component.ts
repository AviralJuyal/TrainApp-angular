import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Booking } from '../../models/booking';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  bookingDetails: Booking = this.userService.currentBooking;

  promoCode: string = '';
  couponApplied: boolean = false;
  allPromos: string[] = ['NEW5'];

  ngOnInit() {
    const localData = localStorage.getItem('currentBooking');
    if (this.userService.currentBooking?.bookingId) {
      this.bookingDetails = this.userService.currentBooking;
    } else if (localData) {
      this.bookingDetails = JSON.parse(localData);
    } else {
      this.toastr.error('No current booking exists');
      this.router.navigateByUrl('/home');
    }
  }

  checkPromo() {
    if (this.couponApplied) {
      this.toastr.error('Coupon already applied');
      return;
    }
    if (this.allPromos.includes(this.promoCode)) {
      this.couponApplied = true;
      this.bookingDetails.totalAmount =
        this.bookingDetails.totalAmount -
        0.05 * this.bookingDetails.totalAmount;
      this.toastr.success('Congratulations you got 5% discount');
      return;
    }
    this.toastr.error('This coupon code does not exist');
  }

  saveBooking() {
    this.toastr.success('Your booking is confirmed');
    this.userService.Allbookings.push(this.bookingDetails);

    setTimeout(() => {
      localStorage.setItem(
        'allBookings',
        JSON.stringify(this.userService.Allbookings)
      );
      this.router.navigateByUrl('/mybookings');
    }, 500);
    localStorage.removeItem('currentBooking');
    // this.userService.currentBookin
  }
}
