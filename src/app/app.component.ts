import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { StoreService } from './services/products/store-service';
import { CardShopComponent } from './components/card-shop/card-shop.component';

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
    <mat-toolbar color="primary">
      <span>Awazon</span>
      <button mat-icon-button>
        <mat-icon>shopping_cart</mat-icon>
      </button>
    </mat-toolbar>

    <section class="list-products">
      @for (product of products$ | async; track product) {
      <app-card-shop [product]="product"></app-card-shop>
      }
    </section>
  `,
})
export class AppComponent implements OnInit {
  private readonly _storeService = inject(StoreService);

  protected products$ = this._storeService.products$;

  ngOnInit(): void {
    this._storeService.connect();
  }
}
