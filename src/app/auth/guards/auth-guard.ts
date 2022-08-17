import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.hasSessionActive().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.hasSessionActive().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
