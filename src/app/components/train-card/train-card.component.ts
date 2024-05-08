import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Train } from '../../models/train';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-train-card',
  templateUrl: './train-card.component.html',
  styleUrl: './train-card.component.scss',
})
export class TrainCardComponent {
  @Input() trainData!: Train;

  @Output() selectedTrain = new EventEmitter<Train>();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  handleBook() {
    this.selectedTrain.emit(this.trainData);
    this.toastr.clear();
    if (!this.userService.isLoggedIn()) {
      this.toastr.error('Please Login first');
      return;
    }

    let modalElement = document.getElementById('bookingModal');
    let modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }
}
