import { Component, OnInit } from '@angular/core';
import { HomePageHeader } from '../components/home-page-header/home-page-header';
import { BookmarkCard } from '../components/bookmark-card/bookmark-card';
import { Bookmark } from '../model/bookmark';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BookmarkActions from '../store/bookmark.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePageHeader, BookmarkCard, AsyncPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
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
        return items.filter((b: Bookmark) => {
          const title = (b.title || '').toLowerCase();
          return title.includes(term);
        });
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(BookmarkActions.loadBookmarks());
  }

  onFilter(query: string) {
    this.filter$.next(query);
  }
}
