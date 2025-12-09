import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../model/bookmark';

export const loadBookmarks = createAction('[Bookmark] Load Bookmarks');

export const loadBookmarksSuccess = createAction(
  '[Bookmark] Load Bookmarks Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadBookmarksFailure = createAction(
  '[Bookmark] Load Bookmarks Failure',
  props<{ error: any }>()
);

export const addBookmarkRequest = createAction(
  '[Bookmark] Add Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const addBookmarkSuccess = createAction(
  '[Bookmark] Add Bookmark Success',
  props<{ bookmark: Bookmark }>()
);

export const addBookmarkFailure = createAction(
  '[Bookmark] Add Bookmark Failure',
  props<{ error: any }>()
);

export const updateBookmark = createAction(
  '[Bookmark] Update Bookmark',
  props<{ id: number; changes: Partial<Bookmark> }>()
);

export const updateBookmarkSuccess = createAction(
  '[Bookmark] Update Bookmark Success',
  props<{ updated: Bookmark }>()
);

export const updateBookmarkFailure = createAction(
  '[Bookmark] Update Bookmark Failure',
  props<{ error: any }>()
);
