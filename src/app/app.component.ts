import { Component, OnInit, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { StoreService } from './services/products/store-service';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
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
      }
    `,
  ],
  template: `
    <mat-toolbar class="toolbar" color="primary">
      <span>Awazon</span>
      <section class="toolbar__filter-section">
        <app-search-input (search)="onSearch($event)"></app-search-input>
      </section>
      <span class="toolbar__spacer"></span>
      <button mat-icon-button>
        <mat-icon>shopping_cart</mat-icon>
      </button>
    </mat-toolbar>

    <section class="list-products">
      @for (product of products$ | async; track product) {
      <app-card-shop [product]="product" />
      }
    </section>
  `,
})
export class AppComponent implements OnInit {
  @Output()
  public readonly _storeService = inject(StoreService);

  protected products$ = this._storeService.products$;

  ngOnInit(): void {
    this._storeService.connect();
  }

  onSearch(text: string) {
    this._storeService.search(text);
  }
}
