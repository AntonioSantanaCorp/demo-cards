import { inject } from '@angular/core';
import { HttpService } from '../../core/http/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models';

export abstract class StoreService {
  protected readonly _getData$ = inject(HttpService).getProducts();

  public abstract products$: Observable<Product[]>;

  public abstract categories$: Observable<string[]>;

  public abstract connect(): void;

  public abstract disconnect(): void;

  public abstract search(text?: string): void;

  public abstract filterByCategories(category?: string): void;
}
