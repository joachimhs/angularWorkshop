import {Component, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../album.service";
import {Album} from "../album";

@Component({
  selector: 'app-photoalbum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photoalbum.component.html',
  styleUrl: './photoalbum.component.css'
})
export class PhotoalbumComponent {
  constructor(private route: ActivatedRoute,
              public albumService: AlbumService) {
    // @ts-ignore
    albumService.find(this.route.snapshot.paramMap.get('albumid'));
  }
}
