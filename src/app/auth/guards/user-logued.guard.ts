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
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoguedGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.hasSessionActive().pipe(          
      map(isAuth => {
        if(!isAuth){
          return true
        }else{
          this.router.navigate(['/posts']);
          return false
        }
      })

    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.hasSessionActive().pipe(
      map(isAuth => {
        if(!isAuth){
          return true
        }else{
          this.router.navigate(['/posts']);
          return false
        }
      })

    );
  }
}