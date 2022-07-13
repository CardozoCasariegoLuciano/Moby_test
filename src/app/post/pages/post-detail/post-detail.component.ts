import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Ipost } from '../../interfaces/user.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  post!: Ipost;
  emmitedValue! :Date

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.postService.getPostByID(id)))
      .subscribe((data) => this.post = data);
  }

  printEmmited(event: Date) {
    this.emmitedValue = event
  }
}
