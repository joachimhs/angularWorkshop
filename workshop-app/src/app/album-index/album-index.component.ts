import {afterNextRender, afterRender, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumService} from "../album.service";
import {PhotoService} from "../photo.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-album-index',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './album-index.component.html',
  styleUrl: './album-index.component.css'
})
export class AlbumIndexComponent {
  imageLength: number = 0;
  constructor(public albumService: AlbumService,
              public photoService: PhotoService) {
    afterRender(() => {
      // @ts-ignore
      this.imageLength = document.getElementById("cf2").children.length;

      let randomImage = Math.floor(Math.random() * this.imageLength);
      // @ts-ignore
      document.getElementById("cf2").children[randomImage].classList.remove("transparent");
    })
  }

  ngOnInit() {
    this.albumService.findAll();
    this.photoService.findAll();
  }
}
