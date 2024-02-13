import { Component, OnInit, inject } from '@angular/core';
import { MemoryService } from '../store/memory.service';
import { CardShopComponent } from '../../shared/card-shop/card-shop.component';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-cards-memory-list',
  standalone: true,
  imports: [CardShopComponent, AsyncPipe],
  providers: [MemoryService],
  host: {
    class: 'list-products',
  },
  template: `
    @for (product of products$ | async; track product) {
    <app-card-shop [product]="product"></app-card-shop>
    }
  `,
  styles: ``,
})
export class CardsMemoryListComponent implements OnInit {
  private readonly _memoryService = inject(MemoryService);
  protected products$ = this._memoryService.products$;

  ngOnInit(): void {
    this._memoryService.connect();
  }
}
