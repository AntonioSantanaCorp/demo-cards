import { Injectable, inject } from '@angular/core';
import { INDEXED_DATABASE } from '../../core/tokens';
import { Subject, defer, from, startWith, switchMap, takeWhile } from 'rxjs';
import { Product } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class CartStoreService {
  private readonly _indexedDB = inject(INDEXED_DATABASE);

  private readonly _changed = new Subject<void>();

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
    const db = await this._indexedDB;
    const tx = db.transaction('cartList', 'readwrite');
    await tx.store.delete(id);
    this._changed.next();
  }
}
