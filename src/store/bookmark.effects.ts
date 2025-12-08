import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as BookmarkActions from './bookmark.actions';
import { BookmarkService } from '../service/bookmark.service';

@Injectable()
export class BookmarkEffects {
  loadBookmarks$!: any;
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
  }
}
