import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'bookmark-card',
  imports: [MatIcon],
  standalone: true,
  templateUrl: './bookmark-card.html',
  styleUrls: ['./bookmark-card.css'],
})
export class BookmarkCard {
  @Input() title!: string;
  @Input() url!: string;
}
