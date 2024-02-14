import { Injectable, inject, signal } from '@angular/core';
import { HttpService } from '../../core/http/http.service';
import { Product } from '../../core/models';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { StoreService } from './store-service';

@Injectable()
export class MemoryStoreService extends StoreService {
  private readonly _store = new BehaviorSubject<Product[]>([]);

  private readonly _products = new BehaviorSubject<Product[]>([]);

  private readonly _categories = new BehaviorSubject<string[]>([]);

  private readonly _destroy = new Subject<void>();

  public override products$ = this._products.asObservable();

  public override categories$ = this._categories.asObservable();

  public connect() {
    this._httpService
      .getProducts()
      .pipe(
        //Add autoincrement manual
        map((results) =>
          results.map((product, index) => ({ ...product, id: index + 1 }))
        ),
        takeUntil(this._destroy)
      )
      .subscribe((results) => {
        this._store.next(results);
        this._products.next(results);
        this._categories.next(
          Array.from(new Set(results.map(({ category }) => category)))
        );
      });
  }

  public override disconnect(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public override search(text?: string): void {
    let products = [...this._store.value];

    if (text)
      products = this._store.value.filter(({ title }) => title.includes(text));

    this._products.next(products);
  }

  public override filterByCategories(search?: string): void {
    let products = [...this._store.value];

    if (search)
      products = this._store.value.filter(
        ({ category }) => category === search
      );

    this._products.next(products);
  }
}
