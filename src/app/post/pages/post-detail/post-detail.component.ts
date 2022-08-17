import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private postService: PostService,
    private router: Router
  ) {}

  post!: Ipost;
  emmitedValue!: Date;

  ngOnInit(): void {
    this.initPost();
  }

  private initPost() {
    this.activeRoute.params
      .pipe(switchMap(({id}) => this.postService.getPostByID(id)))
      .subscribe(
        (data) => {
          this.post = data;
        },
        (err) => this.router.navigate(['404'])
      );
  }

  printEmmited(event: Date) {
    this.emmitedValue = event;
  }
}
