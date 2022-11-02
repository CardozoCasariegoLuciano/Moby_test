import { Component, Input } from '@angular/core';
import { Post } from "../../interfaces/posts.interface";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  showAddPostModal: boolean = false;
  @Input() data: Post[] = [];
  @Input() title: string = "List";

  showNewPostform() {
    this.showAddPostModal = true;
  }

  hideNewPostform() {
    this.showAddPostModal = false;
  }
}
