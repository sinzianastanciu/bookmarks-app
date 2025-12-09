import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '../model/bookmark';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private api = 'http://localhost:3000/bookmarks';

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.api);
  }

  addBookmark(b: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.api, b);
  }

  deleteBookmark(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  updateBookmark(id: number, changes: Partial<Bookmark>): Observable<Bookmark> {
    return this.http.patch<Bookmark>(`${this.api}/${id}`, changes);
  }
}
