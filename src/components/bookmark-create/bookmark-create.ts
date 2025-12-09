import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Bookmark } from '../../model/bookmark';

@Component({
  selector: 'bookmark-create',
  imports: [MatIcon, MatFormFieldModule, MatInputModule, FormsModule, MatDivider, MatButton],
  standalone: true,
  templateUrl: './bookmark-create.html',
  styleUrls: ['./bookmark-create.css'],
})
export class BookmarkCreate {
  @Input() inputType: string = 'Create new';
  @Input() selectedBookmark: Bookmark | null = null;
  @Output() save = new EventEmitter<Bookmark>();
  title = '';
  url = '';

  isFormValid(): boolean {
    return this.title.trim().length > 0 && this.url.trim().length > 0;
  }

  onSave() {
    if (!this.isFormValid()) return;

    const bookmark: Bookmark = {
      id: this.selectedBookmark?.id || Date.now(),
      title: this.title.trim(),
      url: this.url.trim(),
      createdAt: Date.now(),
    };

    this.save.emit(bookmark);
    this.clearInputs();
  }

  clearInputs() {
    this.title = '';
    this.url = '';
  }

  ngOnChanges() {
    if (this.selectedBookmark) {
      this.title = this.selectedBookmark.title;
      this.url = this.selectedBookmark.url;
    }
  }
}
