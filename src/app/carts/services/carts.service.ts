import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cartItems: product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  addToCart(product: product) {
    this.cartItems.push(product);
    this.updateCartItemCount();
  }

  removeFromCart(product: product) {
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartItemCount();
    }
  }

  private updateCartItemCount() {
    this.cartItemCount.next(this.cartItems.length);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }
}
