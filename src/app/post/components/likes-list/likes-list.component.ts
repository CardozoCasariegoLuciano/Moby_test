import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortUser } from 'src/app/auth/interfaces/auth.interface';

@Component({
  selector: 'app-likes-list',
  templateUrl: './likes-list.component.html',
  styleUrls: ['./likes-list.component.scss'],
})
export class LikesListComponent implements OnInit {
  @Input() likes?: ShortUser[];
  @Input() showForm!: boolean;
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getImage(like: ShortUser) {
    return like.photo || '../../../../assets/images/defaultUser.png';
  }

  closeModal() {
    this.oncloseModal.emit(false);
  }
}
