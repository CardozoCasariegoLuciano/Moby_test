import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icoment } from '../../interfaces/user.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() postID!: number;
  @Output() onEmit: EventEmitter<Date> = new EventEmitter();
  comments: Icoment[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getPostComments(this.postID)
      .subscribe((resp) => (this.comments = resp));
  }

  emitir() {
    this.onEmit.emit(new Date());
  }
}
