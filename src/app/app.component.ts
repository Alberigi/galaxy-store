import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICartItem, ICartState } from './interfaces/models';
import { IProductService } from './interfaces/services';
import { getProducts } from './store/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cartItems$: Observable<ICartItem[]>;
  length?: number;
  searchText: string = '';

  constructor(
    private router: Router,
    private store: Store<{ cart: ICartState }>,
    private productService: IProductService
  ) {
    this.cartItems$ = this.store.select((state) => state.cart.items);
    this.cartItems$.subscribe((items) => {
      this.length = items.reduce((acc, item) => {
        return acc + item.qtd;
      }, 0);
    });
  }

  async searchProducts(): Promise<void> {
    const result = await this.productService.search(this.searchText);
    this.store.dispatch(getProducts({ payload: result }));
    this.router.navigate(['']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
