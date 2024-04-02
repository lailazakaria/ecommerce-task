import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  searchQuery: string = '';
  private cartSubscription!: Subscription;
  private searchSubject: Subject<string> = new Subject();
  @Output() searchQueryChange = new EventEmitter<string>();
  constructor(private cartService: CartsService) {}
  ngOnInit() {
    this.cartSubscription = this.cartService
      .getCartItemCount()
      .subscribe((count) => {
        this.cartItemCount = count;
        console.log(this.cartItemCount);
      });
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.searchQueryChange.emit(searchTerm);
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.searchSubject.unsubscribe();
  }

  search(): void {
    this.searchSubject.next(this.searchQuery);
  }
}
