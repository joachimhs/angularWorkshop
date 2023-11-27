import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {

  constructor(private route: ActivatedRoute,
              public albumService : AlbumService) {
  }

  ngOnInit() {
    this.albumService.find(this.route.snapshot.paramMap.get('albumid'));
  }
}
