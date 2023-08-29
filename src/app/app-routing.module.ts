import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CashierHomeComponent } from './components/cashier-home/cashier-home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { AuthService } from './service/auth/auth.service';
import { CashierGuard } from './guard/cashier/cashier.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'cashierHome',
    component: CashierHomeComponent,
    canActivate: [CashierGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
