import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct, IProductsState } from '../interfaces/models';
import { IProductService } from '../interfaces/services';
import { getProducts } from '../store/products/products.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products$: Observable<IProduct[]>;
  products: IProduct[] = [];

  constructor(
    private productService: IProductService,
    private store: Store<{ products: IProductsState }>,
    private router: Router
  ) {
    this.products$ = store.select((state) => state.products.items);
    this.products$.subscribe((items) => (this.products = items));
  }

  async ngOnInit() {
    if (!this.products.length) {
      this.handleGetProducts();
    }
  }

  async handleGetProducts(): Promise<void> {
    const result = await this.productService.get();
    this.store.dispatch(getProducts({ payload: result }));
  }

  selectProduct(id: string): void {
    this.router.navigate(['/product', id]);
  }
}
