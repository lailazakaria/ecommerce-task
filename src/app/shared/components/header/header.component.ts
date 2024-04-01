import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  searchTerm: string = '';

  private cartSubscription!: Subscription;

  constructor(private cartService: CartsService) {}
  ngOnInit() {
    this.cartSubscription = this.cartService
      .getCartItemCount()
      .subscribe((count) => {
        this.cartItemCount = count;
        console.log(this.cartItemCount);
      });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
  searchProducts() {}
}
