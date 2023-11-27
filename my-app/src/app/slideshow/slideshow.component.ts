import {afterRender, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoService} from "../photo.service";

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {
  imageNum : number = 0;
  imageLength : number = 0;
  slideshowId: any = null;

  constructor(public photoService: PhotoService) {
    afterRender(() => {
      this.imageLength = photoService.photos.length;

      this.selectRandomPhoto();
    });
  }

  ngOnDestroy() {
    if (this.slideshowId) {
        clearInterval(this.slideshowId);
        this.slideshowId = null;
      }
  }

  private selectRandomPhoto() {
    // @ts-ignore
    if (document.getElementById("cf2")?.children && this.imageLength > 0) {
      for (let index = 0; index < this.imageLength; index++) {
        // @ts-ignore
        document.getElementById("cf2").children[index].classList.add("transparent");
        // @ts-ignore
        document.getElementById("cf2").children[index].classList.remove("zoom");
      }

      this.imageNum = Math.floor(Math.random() * this.imageLength)
      // @ts-ignore
      document.getElementById("cf2").children[this.imageNum].classList.remove("transparent");
      // @ts-ignore
      document.getElementById("cf2").children[this.imageNum].classList.add("zoom");
    }

    this.slideshowId = setTimeout(() => {
      this.selectRandomPhoto();
    }, 10000);
  }

  ngOnInit() {
    this.photoService.findAll();
  }
}
