import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'trainApp';

  @ViewChild('registerModal', { static: true }) registerModal!: ElementRef;

  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    let data = localStorage.getItem('userData');
    if (data) {
      this.userService.userInfo = JSON.parse(data);
    }
  }

  openRegisterModal() {
    // Open the modal using JavaScript
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  closeRegisterModal() {
    const modal = document.getElementById('registerModal');

    if (modal) {
      modal.style.display = 'none';

      modal.classList.remove('show');
    }
  }
  openLoginModal() {
    // Open the modal using JavaScript
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  closeLoginModal() {
    const modal = document.getElementById('loginModal');

    if (modal) {
      modal.style.display = 'none';

      modal.classList.remove('show');
    }
  }
}
