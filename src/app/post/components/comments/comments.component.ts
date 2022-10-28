import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() comments: Comment[] = [];
  @Input() postID!: string;
}
