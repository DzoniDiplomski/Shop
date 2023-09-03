import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CashierHomeComponent } from './components/cashier-home/cashier-home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { CashierGuard } from './guard/cashier/cashier.guard';
import { AllReceiptsComponent } from './components/all-receipts/all-receipts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'cashierHome',
    component: CashierHomeComponent,
    canActivate: [CashierGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'allReceipts', component: AllReceiptsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
