import { Injectable, inject } from '@angular/core';
import { INDEXED_DATABASE } from '../../core/tokens';
import {
  Subject,
  defer,
  from,
  startWith,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs';
import { Product } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class CartStoreService {
  private readonly _indexedDB = inject(INDEXED_DATABASE);

  private readonly _changed = new Subject<void>();

  public cartList$ = this._changed.pipe(
    startWith({}),
    switchMap(() => this._indexedDB.then((db) => db.getAll('cartList'))),
    tap(console.log)
  );

  public cartListAmount$ = this._changed.pipe(
    startWith({}),
    switchMap(() => this._indexedDB.then((db) => db.count('cartList')))
  );

  public async getProducts() {
    const db = await this._indexedDB;
    return db.getAll('cartList');
  }

  public async addToCart(product: Product) {
    const db = await this._indexedDB;
    const tx = db.transaction('cartList', 'readwrite');
    await tx.store.add(product);
    this._changed.next();
  }

  public async removeCart(id: string) {
    debugger
    const db = await this._indexedDB;
    const deleteIds = await db.getAllKeysFromIndex('cartList', 'id', id);
    const tx = db.transaction('cartList', 'readwrite');
    //Delete all
    await Promise.all(deleteIds.map((id) => tx.store.delete(id)));
    this._changed.next();
  }
}
