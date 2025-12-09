import { Component, OnInit } from '@angular/core';
import { HomePageHeader } from '../components/home-page-header/home-page-header';
import { BookmarkCard } from '../components/bookmark-card/bookmark-card';
import { Bookmark } from '../model/bookmark';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BookmarkActions from '../store/bookmark.actions';
import { AsyncPipe } from '@angular/common';
import Fuse from 'fuse.js';
import { BookmarkCreate } from '../components/bookmark-create/bookmark-create';

interface BookmarkGroup {
  label: string;
  bookmarks: Bookmark[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePageHeader, BookmarkCard, AsyncPipe, BookmarkCreate],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  isListView = true;
  editingBookmark = false;
  isFilterActive = false;
  selectedBookmark: Bookmark | null = null;
  bookmarks: Observable<Bookmark[]>;
  groupedBookmarks: Observable<BookmarkGroup[]>;
  private filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<{ bookmarks: any }>) {
    this.bookmarks = this.store.select((state) => state.bookmarks.bookmarks);
    const filteredBookmarks = combineLatest([this.bookmarks, this.filter$]).pipe(
      map(([list, q]) => {
        const term = (q || '').trim().toLowerCase();
        const items = list || [];

        if (!term) {
          this.isFilterActive = false;
          return items;
        }

        this.isFilterActive = true;
        const fuse = new Fuse(items, { keys: ['title', 'url'], threshold: 0.3 });
        return fuse.search(term).map((result) => result.item);
      })
    );

    this.groupedBookmarks = filteredBookmarks.pipe(map((bookmarks) => this.groupByDate(bookmarks)));
  }

  ngOnInit(): void {
    this.store.dispatch(BookmarkActions.loadBookmarks());
  }

  onFilter(query: string) {
    this.filter$.next(query);
  }

  createBookmark() {
    this.isListView = !this.isListView;
  }

  handleCreate(newBookmark: Bookmark) {
    if (this.editingBookmark && this.selectedBookmark) {
      this.store.dispatch(
        BookmarkActions.updateBookmark({ id: newBookmark.id, changes: newBookmark })
      );
    } else {
      this.store.dispatch(BookmarkActions.addBookmarkRequest({ bookmark: newBookmark }));
    }
    this.isListView = true;
    this.editingBookmark = false;
    this.selectedBookmark = null;
  }

  handleEdit(bookmark: Bookmark) {
    this.editingBookmark = true;
    this.isListView = false;
    this.selectedBookmark = bookmark;
  }

  private groupByDate(bookmarks: Bookmark[]): BookmarkGroup[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: { [key: string]: Bookmark[] } = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    const sorted = [...bookmarks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    sorted.forEach((bookmark) => {
      if (!bookmark.createdAt) {
        groups['Older'].push(bookmark);
        return;
      }

      const bookmarkDate = new Date(bookmark.createdAt);
      const bookmarkDay = new Date(
        bookmarkDate.getFullYear(),
        bookmarkDate.getMonth(),
        bookmarkDate.getDate()
      );

      if (bookmarkDay.getTime() === today.getTime()) {
        groups['Today'].push(bookmark);
      } else if (bookmarkDay.getTime() === yesterday.getTime()) {
        groups['Yesterday'].push(bookmark);
      } else {
        groups['Older'].push(bookmark);
      }
    });

    return ['Today', 'Yesterday', 'Older']
      .filter((label) => groups[label].length > 0)
      .map((label) => ({ label, bookmarks: groups[label] }));
  }
}
