import { Injectable, inject, signal } from '@angular/core';
import { HttpService } from '../../core/http/http.service';
import { Product } from '../../core/models';
import { BehaviorSubject, Subject, map, merge } from 'rxjs';
import { AMOUNT_NEXT_PAGE, INIT_INDEX_PAGE } from '../../core/constants';

@Injectable()
export class MemoryService {
  private readonly _httpService = inject(HttpService);

  private readonly _store$ = new BehaviorSubject<Product[]>([]);

  private readonly _nextPage$ = new Subject<void>();

  private _index = INIT_INDEX_PAGE;

  public productsPerPage$ = merge(this._nextPage$, this._store$).pipe(
    map(() => this._store$.value.slice(this._index, AMOUNT_NEXT_PAGE))
  );

  public connect() {
    this._httpService
      .getProducts()
      .subscribe((results) => this._store$.next(results));
  }

  public next() {
    this._index += AMOUNT_NEXT_PAGE;
    this._nextPage$.next();
  }

  public back() {
    if (this._index - AMOUNT_NEXT_PAGE < INIT_INDEX_PAGE)
      this._index = INIT_INDEX_PAGE;
    else this._index -= AMOUNT_NEXT_PAGE;

    this._nextPage$.next();
  }
}
