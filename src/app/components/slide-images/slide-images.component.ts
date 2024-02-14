import { Component, Input } from '@angular/core';
import { MIN_IMAGE_INDEX } from '../../core/constants';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-slide-images',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  styles: [
    `
      .slide {
        display: grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: auto 2fr auto;
      }

      .slide-img {
        height: 110px;
        width: 100%;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      }
    `,
  ],
  template: `
    <section class="slide">
      <button (click)="goBack()" mat-icon-button>
        <mat-icon>navigate_before</mat-icon>
      </button>
      <img class="slide-img" loading="lazy" [src]="images[index]" alt="image" />
      <button (click)="goNext()" mat-icon-button>
        <mat-icon>navigate_next</mat-icon>
      </button>
    </section>
  `,
})
export class SlideImagesComponent {
  protected index = 0;

  @Input()
  public images: string[] = [];

  public goNext() {
    const nextIndex = this.index + 1;
    const lastIndexImages = this.images!.length - 1;
    this.index = nextIndex > lastIndexImages ? lastIndexImages : nextIndex;
  }

  public goBack() {
    const nextIndex = this.index - 1;
    this.index = nextIndex < MIN_IMAGE_INDEX ? 0 : nextIndex;
  }
}
