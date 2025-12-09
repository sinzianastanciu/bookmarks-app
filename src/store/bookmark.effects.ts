import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as BookmarkActions from './bookmark.actions';
import { BookmarkService } from '../service/bookmark.service';

@Injectable()
export class BookmarkEffects {
  loadBookmarks$!: any;
  addBookmark$!: any;
  updateBookmark$!: any;

  constructor(private actions$: Actions, private bookmarkService: BookmarkService) {
    this.loadBookmarks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.loadBookmarks),
        mergeMap(() =>
          this.bookmarkService.getBookmarks().pipe(
            map((bookmarks) => BookmarkActions.loadBookmarksSuccess({ bookmarks })),
            catchError((error) => of(BookmarkActions.loadBookmarksFailure({ error })))
          )
        )
      )
    );

    this.addBookmark$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.addBookmarkRequest),
        mergeMap(({ bookmark }) =>
          this.bookmarkService.addBookmark(bookmark).pipe(
            map((newBookmark) => BookmarkActions.addBookmarkSuccess({ bookmark: newBookmark })),
            catchError((error) => of(BookmarkActions.addBookmarkFailure({ error })))
          )
        )
      )
    );

    this.updateBookmark$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.updateBookmark),
        mergeMap((action) =>
          this.bookmarkService.updateBookmark(action.id, action.changes).pipe(
            map((updated) => BookmarkActions.updateBookmarkSuccess({ updated })),
            catchError((err) => of(BookmarkActions.updateBookmarkFailure({ error: err })))
          )
        )
      )
    );
  }
}
