import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { Product } from '../../core/models';
import { CART_LIST_COLUMNS } from '../../core/constants';
import { CartStoreService } from '../../services/cart/cart-store.service';
import { CartListResumeSource } from '../../core/classes/cart-list-resume';

@Component({
  selector: 'app-cart-list-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CurrencyPipe,
  ],
  styles: ``,
  template: `
    <h2 mat-dialog-title>Cart List</h2>
    <mat-dialog-content>
      <table mat-table [dataSource]="dataSource">
        <!-- Name Column -->
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let element">
            {{ element.product.title }}
          </td>
        </ng-container>

        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let element" style="text-align: center;">
            {{ element.amount }}
          </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let element">
            {{ element.product.price * element.amount | currency }}
          </td>
        </ng-container>

        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button
              (click)="onDelete(element.product.id)"
              mat-icon-button
              color="warn"
            >
              <mat-icon fontSet="material-icons-outlined">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" mat-dialog-close>No Thanks</button>
      <button mat-flat-button color="primary">Buy</button>
    </mat-dialog-actions>
  `,
})
export class CartListModalComponent {
  private readonly _cartListStore = inject(CartStoreService);

  protected readonly displayedColumns = CART_LIST_COLUMNS;

  protected readonly dataSource: CartListResumeSource;

  constructor() {
    this.dataSource = new CartListResumeSource(this._cartListStore.cartList$);
  }

  onDelete(id: string) {
    this._cartListStore.removeCart(id);
  }
}
