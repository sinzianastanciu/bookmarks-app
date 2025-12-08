import { createReducer, on } from '@ngrx/store';
import * as BookmarkActions from './bookmark.actions';

export interface BookmarkState {
  bookmarks: { id: number; title: string; url: string }[];
  loading: boolean;
  error: any;
}

export const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
  error: null,
};

export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.loadBookmarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    loading: false,
    bookmarks,
  })),
  on(BookmarkActions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);