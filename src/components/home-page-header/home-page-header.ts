import { Component, EventEmitter, Output } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'home-page-header',
  imports: [SearchBar, MatIcon],
  templateUrl: './home-page-header.html',
  styleUrl: './home-page-header.css',
})
export class HomePageHeader {
  @Output() filter = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();

  applyFilter(query: string) {
    this.filter.emit(query);
  }

  createBookmark() {
    this.create.emit();
  }
}
