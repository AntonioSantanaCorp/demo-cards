import { Injectable, inject, signal } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Product } from '../core/models';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { StoreService } from './store-service';

@Injectable()
export class MemoryStoreService extends StoreService {
  private readonly _store = new BehaviorSubject<Product[]>([]);

  private readonly _destroy = new Subject<void>();

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
        console.log(results);
      });
  }

  public override disconnect(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public override search(text?: string): Observable<Product[]> {
    if (!text) this._store.asObservable();

    return this._store.pipe(
      map((result) => result.filter(({ title }) => title.includes(text!)))
    );
  }

  public override getCategories(): Observable<string[]> {
    throw new Error('Method not implemented.');
  }

  public override filterByCategories(category: string): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }

  public override addToCart(): void {
    throw new Error('Method not implemented.');
  }

  public override removeToCart(): void {
    throw new Error('Method not implemented.');
  }
}
