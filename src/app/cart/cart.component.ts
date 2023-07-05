import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICartItem, ICartState } from '../interfaces/models';
import { IProductService } from '../interfaces/services';
import { changeQtd, clearCart, removeItem } from '../store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartState$: Observable<ICartState>;
  cartItems: ICartItem[] = [];
  amoutCart: number = 0;
  name = '';
  deliveryAddress = '';
  messageSuccessRemoveAll = 'Todos os produtos foram removidos com sucesso.';
  messageSuccessRemove = 'Produto removido com sucesso.';

  constructor(
    private productService: IProductService,
    private toastr: ToastrService,
    private store: Store<{ cart: ICartState }>,
    private router: Router
  ) {
    this.cartState$ = this.store.select((state) => state.cart);
    this.cartState$.subscribe((cart) => (this.cartItems = cart.items));
    this.cartState$.subscribe((cart) => (this.amoutCart = cart.amountValue));
  }

  getItemFullPrice(cardItem: ICartItem): number {
    return cardItem.price * cardItem.qtd;
  }

  async buy(): Promise<void> {
    await this.productService.sendOrder(
      this.cartItems,
      this.name,
      this.deliveryAddress
    );
    this.router.navigate(['/']);
  }

  async removeProduct(id: string): Promise<void> {
    this.store.dispatch(removeItem({ payload: id }));
    this.toastr.info(this.messageSuccessRemove);
  }

  async removeAllProducts(): Promise<void> {
    this.store.dispatch(clearCart());
    this.toastr.info(this.messageSuccessRemoveAll);
  }

  increment(cartItem: ICartItem): void {
    const payload = {
      id: cartItem.id,
      qtd: cartItem.qtd + 1,
    };
    this.store.dispatch(changeQtd({ payload }));
  }

  decrement(cartItem: ICartItem): void {
    if (cartItem.qtd > 0) {
      const payload = {
        id: cartItem.id,
        qtd: cartItem.qtd - 1,
      };

      this.store.dispatch(changeQtd({ payload }));
    }
  }
}
