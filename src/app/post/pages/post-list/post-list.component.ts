import { Component } from '@angular/core';
import {Iuser} from '../../interfaces/user.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  data: Iuser[] = [
    {
      name: "Rogelio",
      id: 1
    },
    {
      name: "Rogelio",
      id: 2
    },
    {
      name: "Rogelio",
      id: 3
    },
    {
      name: "Rogelio",
      id: 4
    },
    {
      name: "Rogelio",
      id: 5
    },
    {
      name: "Rogelio",
      id: 6
    },
    {
      name: "Rogelio",
      id: 7
    },
    {
      name: "Rogelio",
      id: 8
    },
    {
      name: "Rogelio",
      id: 9
    },
    {
      name: "Rogelio",
      id: 10
    },
  ]

}
