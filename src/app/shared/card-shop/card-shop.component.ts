import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-shop',
  standalone: true,
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Shiba Inu</mat-card-title>
      </mat-card-header>
      <!-- <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        alt="Photo of a Shiba Inu"
      /> -->
      <mat-card-content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>Add favorite</button>
        <button mat-button>Buy</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ``,
})
export class CardShopComponent {}
