import { Injectable, inject, signal } from '@angular/core';
import { HttpService } from '../../core/http/http.service';
import { Product } from '../../core/models';
import { BehaviorSubject, Subject, map, merge } from 'rxjs';
import { AMOUNT_NEXT_PAGE, INIT_INDEX_PAGE } from '../../core/constants';

@Injectable()
export class MemoryService {
  private readonly _httpService = inject(HttpService);

  private readonly _store$ = new BehaviorSubject<Product[]>([]);

  public products$ = this._store$.asObservable();

  public connect() {
    this._httpService
      .getProducts()
      .subscribe((results) => this._store$.next(results));
  }
}
