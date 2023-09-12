import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkAuthentication();
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(() => {
      switch (this.authService.getUserRole()) {
        case 'KASIR':
          this.router.navigate(['/cashierHome']);
          break;
        case 'MENADZER':
          this.router.navigate(['/managerHome']);
          break;
        default:
          console.log('Not logged in');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
