import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.checkAuthentication();
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );

    if (this.isLoggedIn) {
      switch (this.authService.getUserRole()) {
        case 'KASIR':
          return this.router.parseUrl('/cashierHome');
        case 'MENADZER':
          return this.router.parseUrl('/managerHome');
        default:
          return this.router.parseUrl('/login');
      }
    }
    return true;
  }
}
