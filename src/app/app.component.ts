import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreService } from './services/products/store-service';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { CategoriesFilterComponent } from './components/categories-filter/categories-filter.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map } from 'rxjs';
import { CartListModalComponent } from './components/cart-list-modal/cart-list-modal.component';
import { CartStoreService } from './services/cart/cart-store.service';
import { Product } from './core/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CardShopComponent,
    SearchInputComponent,
    AsyncPipe,
    MatBadgeModule,
    CategoriesFilterComponent,
    MatDialogModule,
  ],
  styles: [
    `
      .toolbar {
        gap: 10px;
      }

      .toolbar__spacer {
        flex: 1 1 auto;
      }

      .toolbar__filter-section {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 10px;
      }
    `,
  ],
  template: `
    <mat-toolbar class="toolbar" color="primary">
      <span>Awazon {{ amount$ | async }} </span>
      <section class="toolbar__filter-section">
        <app-search-input (search)="onSearch($event)" />
        <app-categories-filter
          [categories]="categories$ | async"
          (selected)="onSelectCategory($event)"
        />
      </section>
      <span class="toolbar__spacer"></span>
      <button (click)="openCartListDialog()" mat-icon-button>
        <mat-icon [matBadge]="cartListAmount$ | async" matBadgeColor="accent">
          shopping_cart
        </mat-icon>
      </button>
    </mat-toolbar>

    <section class="list-products">
      @for (product of products$ | async; track product.id) {
      <app-card-shop (buyProduct)="onBuyItem($event)" [product]="product" />
      }
    </section>
  `,
})
export class AppComponent implements OnInit {
  public readonly _productsStore = inject(StoreService);

  public readonly _cartListStore = inject(CartStoreService);

  private readonly _matDialog = inject(MatDialog);

  protected readonly products$ = this._productsStore.products$;

  protected readonly amount$ = this.products$.pipe(map(({ length }) => length));

  protected readonly categories$ = this._productsStore.categories$;

  protected readonly cartListAmount$ = this._cartListStore.cartListAmount$;

  ngOnInit(): void {
    console.time('fetchData');
    this._productsStore.connect();
    console.timeEnd('fetchData');
  }

  onSearch(text: string) {
    console.time('filterText');
    this._productsStore.search(text);
    console.time('filterText');
  }

  onSelectCategory(category: string) {
    console.time('filterCategory');
    this._productsStore.filterByCategories(category);
    console.timeEnd('filterCategory');
  }

  async openCartListDialog() {
    const cartListItems = await this._cartListStore.getProducts();
    
    this._matDialog.open(CartListModalComponent, {
      data: cartListItems,
    });
  }

  onBuyItem(product: Product) {
    this._cartListStore.addToCart(product);
  }
}
