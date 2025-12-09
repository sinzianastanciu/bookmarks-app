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
  bookmarks: Observable<Bookmark[]>;
  filteredBookmarks: Observable<Bookmark[]>;
  private filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<{ bookmarks: any }>) {
    this.bookmarks = this.store.select((state) => state.bookmarks.bookmarks);
    this.filteredBookmarks = combineLatest([this.bookmarks, this.filter$]).pipe(
      map(([list, q]) => {
        const term = (q || '').trim().toLowerCase();
        const items = list || [];
        if (!term) return items;
        const fuse = new Fuse(items, { keys: ['title', 'url'], threshold: 0.3 });
        return fuse.search(term).map((result) => result.item);
      })
    );
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
    this.store.dispatch(BookmarkActions.addBookmarkRequest({ bookmark: newBookmark }));
    this.isListView = true;
  }
}
