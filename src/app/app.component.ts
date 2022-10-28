import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {AuthService} from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  route: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
      }
    });
  }

  get showHeader() {
    return this.authService.isLogged
  }
}
