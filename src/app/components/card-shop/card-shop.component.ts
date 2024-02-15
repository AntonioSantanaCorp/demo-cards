import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../../core/models';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-shop',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CurrencyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'shop-card',
  },
  template: ` <section class="shop-card__images">
      <img
        class="shop-card__images__view"
        [src]="selectImgView"
        alt="view image"
      />
      <div class="shop-card__images__miniature">
        @for (image of images ;track $index) {
        <img
          [src]="image"
          alt="miniature image"
          (click)="selectViewImg($index)"
        />
        }
      </div>
    </section>
    <section class="shop-card__info ">
      <h3 class="shop-card__info__title">{{ product?.title }}</h3>
      <div class="shop-card__info__description">
        <span>{{ product?.description }}</span>
        <span class="shop-card__info__category"> {{ product?.category }} </span>
      </div>
      <div class="shop-card__info__footer">
        <span class="mat-body-strong">{{ product?.price | currency }}</span>
        <button
          mat-mini-fab
          color="primary"
          (click)="buyProduct.emit(product!)"
        >
          <mat-icon>shopping_bag</mat-icon>
        </button>
      </div>
    </section>`,
})
export class CardShopComponent implements OnInit {
  @Output()
  public readonly buyProduct = new EventEmitter<Product>();

  @Input({ required: true })
  public product!: Product | null;

  public selectImgView = '';

  public get images() {
    return this.product?.images ?? [];
  }

  public ngOnInit(): void {
    this.selectImgView = this.images[0];
  }

  public selectViewImg(index: number) {
    this.selectImgView = this.images[index] ?? '';
  }
}
// <mat-card style="height: 100%;display:grid;gap:5px">
//       <mat-card-header>
//         <mat-card-title>{{ product?.title }}</mat-card-title>
//       </mat-card-header>
//       <mat-card-content>
//         <app-slide-images [images]="this.product?.images ?? []" />

//         <p>{{ product?.description }}</p>
//         <mat-chip color="primary"> {{ product?.category }}</mat-chip>
//         <p>Rating: {{ product?.rating?.rate }}</p>
//         <p>Price: {{ product?.price | currency }}</p>
//       </mat-card-content>
//       <mat-card-actions align="end">
//         <button
//           mat-raised-button
//           color="primary"
//           (click)="buyProduct.emit(product!)"
//         >
//           Buy
//         </button>
//       </mat-card-actions>
//     </mat-card>

// <div style="display:flex;flex-direction:column;">
// <!-- <mat-chip style="width: fit-content;">{{ product?.category }}</mat-chip> -->
// </div>
