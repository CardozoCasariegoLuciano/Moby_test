import { Component, Input } from '@angular/core';
import { Icoment } from '../../interfaces/user.interface';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent {
  @Input() comment!: Icoment;
  isUpper: boolean = false;

  changeCase() {
    this.isUpper = !this.isUpper;
  }
}
