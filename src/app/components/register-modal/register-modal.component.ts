import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/stations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss',
})
export class RegisterModalComponent {
  @Input() openRegisterModal!: Function;
  @Input() closeRegisterModal!: Function;

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

  handleRegister() {
    this.userService
      .registerUser(this.userDetails)
      .subscribe((res: ResponseModel) => {
        this.userService.userInfo = res.data;
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.toastr.success('User registration successful');
        this.closeRegisterModal();
      });
  }
}
