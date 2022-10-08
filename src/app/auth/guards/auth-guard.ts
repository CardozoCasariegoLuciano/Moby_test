import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  isAllowed() {
    return this.authService.hasSessionActive().pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.isAllowed();
  }

  canLoad(): Observable<boolean> {
    return this.isAllowed();
  }
}
