import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../../models/product';
import { CartsService } from 'src/app/carts/services/carts.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: any[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  loading: boolean = false;
  constructor(
    private productService: ProductsService,
    private cartService: CartsService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe(
      (data: product[]) => {
        console.log(data);
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    );
  }

  addToCart(product: product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: product): void {
    this.cartService.removeFromCart(product);
  }

  getPaginatedProducts(): product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.products.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
