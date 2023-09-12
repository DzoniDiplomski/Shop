import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CashierHomeComponent } from './components/cashier-home/cashier-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllReceiptsComponent } from './components/all-receipts/all-receipts.component';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';
import { AllInvoicesComponent } from './components/all-invoices/all-invoices.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { MatListModule } from '@angular/material/list';
import { CreateRequisitionComponent } from './components/create-requisition/create-requisition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePriceComponent } from './components/update-price/update-price.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceStatsComponent } from './components/price-stats/price-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CashierHomeComponent,
    AllReceiptsComponent,
    ReceiptDetailComponent,
    AllInvoicesComponent,
    InvoiceDetailsComponent,
    ManagerHomeComponent,
    CreateRequisitionComponent,
    UpdatePriceComponent,
    PriceStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
