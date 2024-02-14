import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-categories-filter',
  standalone: true,
  imports: [MatChipsModule],
  styles: [
    `
      mat-chip-option {
        background: transparent !important;
        border: 0.2px solid lightgray;
      }

      :host::ng-deep mat-chip-option .mat-mdc-chip-action-label {
        color: white !important;
      }
    `,
  ],
  template: `
    <mat-chip-listbox (change)="selected.emit($event.value)">
      @for (category of categories; track category) {
      <mat-chip-option color="accent">{{ category }}</mat-chip-option>
      }
    </mat-chip-listbox>
  `,
})
export class CategoriesFilterComponent {
  @Input()
  categories: string[] | null = [];

  @Output()
  selected = new EventEmitter<string>();
}
