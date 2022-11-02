import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShortUser } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-likes-list',
  templateUrl: './likes-list.component.html',
  styleUrls: ['./likes-list.component.scss'],
})
export class LikesListComponent {
  @Input() likes?: ShortUser[];
  @Input() showForm!: boolean;
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();

  getImage(like: ShortUser) {
    return like.photo || '../../../../assets/images/defaultUser.png';
  }

  closeModal() {
    this.oncloseModal.emit(false);
  }
}
