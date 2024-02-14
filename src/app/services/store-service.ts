import { inject } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../core/models';

export abstract class StoreService {
  protected readonly _httpService = inject(HttpService);

  public abstract connect(): void;

  public abstract disconnect(): void;

  public abstract search(text?: string): Observable<Product[]>;

  public abstract getCategories(): Observable<string[]>;

  public abstract filterByCategories(category: string): Observable<Product[]>;

  public abstract addToCart(): void;

  public abstract removeToCart(): void;
}
