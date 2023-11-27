import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoService} from "../photo.service";
import {ActivatedRoute, RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent {

  constructor(private route: ActivatedRoute,
              public photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.find(this.route.snapshot.paramMap.get('photoid'));
  }
}
