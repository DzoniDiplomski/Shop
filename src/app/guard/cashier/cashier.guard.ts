import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CashierGuard implements CanActivate {
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

    if (this.authService.getUserRole() === 'KASIR' && this.isLoggedIn) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
