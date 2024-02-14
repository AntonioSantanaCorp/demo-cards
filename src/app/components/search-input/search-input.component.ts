import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: white;
        color: black;
        border-radius: 35px;
        height: 35px;
        padding: 0 7px;
      }

      input {
        border: none;
        background-image: none;
        outline: none;
        background: transparent;
        height: 100%;
        width: 9em;
        font-size: 15.2px;
      }

      .clear-btn {
        cursor: pointer;
      }
    `,
  ],
  template: `
    <mat-icon>search</mat-icon>
    <input #input (input)="search.emit(input.value)" type="text" />
    <mat-icon
      (click)="clearSearch(input)"
      class="clear-btn"
      fontSet="material-icons-outlined"
    >
      cancel
    </mat-icon>
  `,
})
export class SearchInputComponent {
  @Output()
  public readonly search = new EventEmitter<string>();

  protected clearSearch(input: HTMLInputElement) {
    this.search.emit('');
    input.value = '';
  }
}
