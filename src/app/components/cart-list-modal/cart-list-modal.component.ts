import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CartStoreService } from '../../services/cart/cart-store.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { Product } from '../../core/models';
@Component({
  selector: 'app-cart-list-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, AsyncPipe],
  styles: ``,
  template: `
    <h2 mat-dialog-title>Cart List</h2>
    <mat-dialog-content> </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" mat-dialog-close>No Thanks</button>
      <button mat-flat-button color="primary">Buy</button>
    </mat-dialog-actions>
  `,
})
export class CartListModalComponent {
  private readonly _cartListItems: Product[] = inject(MAT_DIALOG_DATA);

  
}
