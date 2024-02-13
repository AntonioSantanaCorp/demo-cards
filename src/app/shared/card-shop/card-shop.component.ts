import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SlideImagesComponent } from '../slide-images/slide-images.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../../core/models';

@Component({
  selector: 'app-card-shop',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    SlideImagesComponent,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card style="height: 100%;display:grid;gap:5px">
      <mat-card-header>
        <mat-card-title>{{ product?.title }}</mat-card-title>
      </mat-card-header>

      <app-slide-images mat-card-image [images]="product?.images ?? []" />
      <mat-card-content>
        <p>
          {{ product?.description }}
        </p>
        <mat-chip color="primary"> {{ product?.category }}</mat-chip>

        <p>Rating: {{ product?.rating?.rate }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>Add favorite</button>
        <button mat-button>Buy</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class CardShopComponent {
  @Input({ required: true })
  product!: Product | null;
}
