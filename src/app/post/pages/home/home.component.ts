import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: Post[] = [];
  isready: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.initPosts();
  }

  private initPosts() {
    this.postService.getPosts().subscribe((resp) => {
      console.log(resp)
      this.data = resp;
      this.isready = true;
    });
  }
}
