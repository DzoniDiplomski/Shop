import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CashierHomeComponent } from './components/cashier-home/cashier-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cashierHome', component: CashierHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
