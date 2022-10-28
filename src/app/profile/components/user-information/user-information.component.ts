import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Post } from 'src/app/post/interfaces/posts.interface';
import { PostService } from 'src/app/post/services/post.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit, OnDestroy {
  @Input() userData!: User;
  @Output() isEditting: EventEmitter<boolean> = new EventEmitter();

  userPosts: Post[] = [];
  arePostReady: boolean = false;
  isMapModalOpen: boolean = false;
  getUserPostsSubscriber!: Subscription;
  image!: string;

  constructor(private postService: PostService) {}

  ngOnDestroy(): void {
    this.getUserPostsSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserPosts();
    this.setImage();
  }

  private setImage() {
    this.image =
      this.userData.photo || '../../../../assets/images/defaultUser.png';
  }

  emmitEdit() {
    this.isEditting.emit(true);
  }

  private getUserPosts() {
    this.getUserPostsSubscriber = this.postService
      .getPostsByUserID(this.userData.id!)
      .subscribe((posts) => {
        this.userPosts = posts as Post[];
        this.arePostReady = true;
      });
  }

  showMapModal() {
    this.isMapModalOpen = true;
  }

  closeMapModal() {
    this.isMapModalOpen = false;
  }
}
