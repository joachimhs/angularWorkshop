import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumService} from "../album.service";
import {PhotoService} from "../photo.service";

@Component({
  selector: 'app-album-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-index.component.html',
  styleUrl: './album-index.component.css'
})
export class AlbumIndexComponent {

  constructor(public albumService: AlbumService,
              public photoService: PhotoService) {
  }

  ngOnInit() {
    this.albumService.findAll();
    this.photoService.findAll();
  }
}
