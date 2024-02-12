import { Component } from '@angular/core';
import { MemoryService } from '../store/memory.service';

@Component({
  selector: 'app-cards-memory-list',
  standalone: true,
  imports: [],
  providers:[MemoryService],
  template: `
    <p>
      cards-memory-list works!
    </p>
  `,
  styles: ``
})
export class CardsMemoryListComponent {

}
