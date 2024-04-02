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
  products: product[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  loading: boolean = false;
  searchQuery: string = '';

  constructor(
    private productService: ProductsService,
    private cartService: CartsService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(
      (data: product[]) => {
        console.log(data);
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products', error);
        this.loading = false;
      }
    );
  }

  addToCart(product: product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: product) {
    this.cartService.removeFromCart(product);
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.products.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  updateProducts(searchQuery: string) {
    this.searchQuery = searchQuery.trim().toLowerCase();
    console.log(this.searchQuery);
    if (this.searchQuery) {
      this.products = this.products.filter(
        (product) =>
          product.title.toLowerCase().includes(this.searchQuery) ||
          product.category.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.ngOnInit();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getPaginationArray().length) {
      this.currentPage++;
    }
  }
}
