import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  isEditing: boolean = false;
  userData!: User;
  getUserSubscriber!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.getUserSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserLogued();
  }

  private getUserLogued() {
    this.getUserSubscriber = this.authService.getUserLogued.subscribe(
      (value) => {
        this.userData = value!;
      }
    );
  }

  edit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
