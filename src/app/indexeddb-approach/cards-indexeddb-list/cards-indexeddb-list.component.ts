import { Component } from '@angular/core';
import { IndexeddbService } from '../store/indexeddb.service';

@Component({
  selector: 'app-cards-indexeddb-list',
  standalone: true,
  imports: [],
  providers: [IndexeddbService],
  template: ` <p>cards-indexeddb-list works!</p> `,
  styles: ``,
})
export class CardsIndexeddbListComponent {}
