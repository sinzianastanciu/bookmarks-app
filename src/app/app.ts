import { Component, OnInit } from '@angular/core';
import { HomePageHeader } from '../components/home-page-header/home-page-header';
import { BookmarkCard } from '../components/bookmark-card/bookmark-card';
import { Bookmark } from '../model/bookmark';
import { BookmarkService } from '../service/bookmark.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomePageHeader, BookmarkCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App{
 bookmarks: Observable<Bookmark[]>;

  constructor(private bookmarkService: BookmarkService) {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
}
