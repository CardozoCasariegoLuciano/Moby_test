import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Icoment } from '../../interfaces/user.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postID!: number;
  @Output() onEmit: EventEmitter<Date> = new EventEmitter();
  comments: Icoment[] = [];
  displayBasic: boolean = false;

  constructor(private postService: PostService) {}

  notifierSubscription: Subscription =
    this.postService.subjectNotifier.subscribe(() => {
      this.initComents();
    });

  ngOnDestroy(): void {
    this.notifierSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initComents();
  }

  private initComents() {
    this.postService.getPostComments(this.postID).subscribe((resp) => {
      this.comments = [];
      this.comments = resp;
    });
  }

  sendEmmitd(value: Date) {
    this.onEmit.emit(value);
    this.update();
  }

  showDialog() {
    this.displayBasic = true;
  }

  closeModal(_: boolean) {
    this.displayBasic = false;
  }

  update() {
    this.initComents();
  }
}
