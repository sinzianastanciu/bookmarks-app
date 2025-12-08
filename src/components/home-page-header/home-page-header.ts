import { Component } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'home-page-header',
  imports: [SearchBar, MatIcon],
  templateUrl: './home-page-header.html',
  styleUrl: './home-page-header.css',
})
export class HomePageHeader {}
