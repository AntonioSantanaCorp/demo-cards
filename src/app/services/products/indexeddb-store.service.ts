import { Inject, Injectable, inject } from '@angular/core';
import { StoreService } from './store-service';
import {
  Observable,
  Subject,
  from,
  lastValueFrom,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AwazonDB, Product } from '../../core/models';
import { IDBPDatabase, openDB } from 'idb';
import { INDEXED_DATABASE } from '../../core/tokens';

@Injectable()
export class ProductIDBStore extends StoreService {
  private readonly _indexedDB = inject(INDEXED_DATABASE);

  private readonly _products = new Subject<Product[]>();

  private readonly _categories = new Subject<string[]>();

  private readonly _destroy = new Subject<void>();

  public override products$ = this._products.asObservable();

  public override categories$ = this._categories.asObservable();

  private async getData() {
    const db = await this._indexedDB;

    if (await db.count('products')) return db.getAll('products', null);
    else {
      const products = await lastValueFrom(this._getData$);
      const tx = db.transaction('products', 'readwrite');
      const transactions = products.map((product) => tx.store.put(product));
      await Promise.all([...transactions, tx.done]);

      return db.getAll('products');
    }
  }

  public override connect(): void {
    this.getData().then((products) => {
      //Fill elements
      this._products.next(products!);
      this._categories.next(
        Array.from(new Set(products!.map(({ category }) => category)))
      );
    });
  }

  public override disconnect(): void {
    this._destroy.next();
    this._destroy.complete();

    this._indexedDB.then((database) => {
      database.deleteObjectStore('products');
      database.deleteObjectStore('cartList');
      database.close();
    });
  }

  public override async search(text?: string | undefined) {
    const db = await this._indexedDB;
    let products: Product[] = await db.getAll('products');

    if (text) products = products.filter(({ title }) => title.includes(text));

    this._products.next(products);
  }

  public override async filterByCategories(category?: string | undefined) {
    const db = await this._indexedDB;
    const products = await db.getAllFromIndex('products', 'category', category);

    this._products.next(products);
  }
}
