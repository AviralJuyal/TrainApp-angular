import { Component, Input, Self } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ResponseModel } from '../../models/stations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  @Input() openLoginModal!: Function;
  @Input() closeLoginModal!: Function;

  userDetails: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passengerID: Date.now(),
  };

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  handleLogin() {
    this.userService.loginUser(this.userDetails).subscribe((res) => {
      this.userService.userInfo = res.data;
      localStorage.setItem('userData', JSON.stringify(res.data));
      this.toastr.success('Logged in successfully');
      this.closeLoginModal();
    });
  }
}
