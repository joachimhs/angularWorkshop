import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {AlbumService} from "../album.service";
import {SlideshowComponent} from "../slideshow/slideshow.component";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-album-index-component',
  standalone: true,
  imports: [CommonModule, SlideshowComponent, RouterModule],
  templateUrl: './album-index-component.component.html',
  styleUrl: './album-index-component.component.css'
})
export class AlbumIndexComponentComponent{

  constructor(public albumService: AlbumService) {
  }

  ngOnInit() {
    this.albumService.findAll();
  }
}
