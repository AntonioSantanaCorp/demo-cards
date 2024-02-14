import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardShopComponent } from './shared/card-shop/card-shop.component';
import { AsyncPipe } from '@angular/common';
import { MemoryStoreService } from './services/memory-store.service';
import { StoreService } from './services/store-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CardShopComponent,
    AsyncPipe,
  ],
  template: `
    <mat-toolbar
      color="primary"
      style="display: flex; justify-content: space-between"
    >
      <span>Awazon</span>
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>
    </mat-toolbar>

    <section class="list-products">
      <!-- @for (product of products$ | async; track product) {
      <app-card-shop [product]="product"></app-card-shop>
      } -->
    </section>
  `,
})
export class AppComponent implements OnInit {
  private readonly _storeService = inject(StoreService);

  // protected products$ = this._storeService.products$;

  ngOnInit(): void {
    this._storeService.connect();
  }
}
