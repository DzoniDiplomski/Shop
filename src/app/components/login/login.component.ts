import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

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
    },
    (error) => {
      this.toastr.error('Wrong credentials', "Error")
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
