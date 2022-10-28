import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../interfaces/posts.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  data: Post[] = [];
  isready: boolean = false;
  postSubscription!: Subscription;

  constructor(private postService: PostService) {}

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.initPosts();
  }

  private initPosts() {
    this.postSubscription = this.postService.getPosts().subscribe((resp) => {
      this.data = resp;
      this.isready = true;
    });
  }
}
