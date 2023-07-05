import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ICartItem, IProduct } from '../interfaces/models';
import { IHttpClientService } from '../interfaces/services';
import { addItem } from '../store/cart/cart.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: IProduct | null = null;
  quantity: number = 1;
  messageError = 'Insira à quantidade do produto.';
  messageSuccess = 'Produto adicionado no carrinho.';

  constructor(
    private httpClientService: IHttpClientService,
    private toastr: ToastrService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.product = await this.httpClientService.get(
      `https://mandalorian-store.netlify.app/api/equipments/${itemId}`
    );
  }

  buyNow() {
    if (this.quantity > 0) {
      this.addInCart();
      this.router.navigate(['/cart']);
      this.toastr.success(this.messageSuccess);
    } else {
      this.toastr.error(this.messageError);
    }
  }

  addInCart() {
    if (this.quantity > 0) {
      const item = { ...this.product, qtd: 1 } as ICartItem;
      this.store.dispatch(addItem({ payload: item }));
    } else {
      this.toastr.error(this.messageSuccess);
    }
  }
}
