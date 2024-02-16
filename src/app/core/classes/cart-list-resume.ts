import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CartListResume, Product } from '../models';
import { Observable, Subject, map, takeUntil } from 'rxjs';

export class CartListResumeSource extends DataSource<CartListResume> {
  private readonly _destroy = new Subject<void>();

  private readonly _dataStream!: Observable<CartListResume[]>;

  constructor(cartList$: Observable<Product[]>) {
    super();
    this._dataStream = cartList$.pipe(
      map((products) => this.createCartListResume(products)),
      takeUntil(this._destroy)
    );
  }

  public override connect(): Observable<CartListResume[]> {
    return this._dataStream;
  }

  public override disconnect(): void {
    this._destroy.next();
  }

  private createCartListResume(products: Product[]) {
    const resume = products.reduce((accum: CartListResume[], product) => {
      const index = accum.findIndex(({ product: { id } }) => id == product.id);

      if (index !== -1) accum[index].amount = accum[index].amount + 1;
      else return [...accum, { product: product, amount: 1 }];

      return accum;
    }, []);

    return resume;
  }
}
