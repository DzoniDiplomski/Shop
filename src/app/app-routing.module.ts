import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CashierHomeComponent } from './components/cashier-home/cashier-home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { CashierGuard } from './guard/cashier/cashier.guard';
import { AllReceiptsComponent } from './components/all-receipts/all-receipts.component';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';
import { AllInvoicesComponent } from './components/all-invoices/all-invoices.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ManagerGuard } from './guard/manager/manager.guard';
import { CreateRequisitionComponent } from './components/create-requisition/create-requisition.component';
import { UpdatePriceComponent } from './components/update-price/update-price.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'cashierHome',
    component: CashierHomeComponent,
    canActivate: [CashierGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'allReceipts',
    component: AllReceiptsComponent,
    canActivate: [CashierGuard],
  },
  {
    path: 'receipt/:id/:createdAt',
    component: ReceiptDetailComponent,
    canActivate: [CashierGuard],
  },
  {
    path: 'allInvoices',
    component: AllInvoicesComponent,
    canActivate: [CashierGuard],
  },
  {
    path: 'invoice/:id/:createdAt',
    component: InvoiceDetailsComponent,
    canActivate: [CashierGuard],
  },
  {
    path: 'managerHome',
    component: ManagerHomeComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'createRequisition',
    component: CreateRequisitionComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'updatePrice',
    component: UpdatePriceComponent,
    canActivate: [ManagerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
