import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) { }

  id!: string

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({id}) => this.id = id)
  }

}
