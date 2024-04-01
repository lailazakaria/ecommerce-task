import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [ProductListComponent],
})
export class ProductsModule {}
