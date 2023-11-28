import {Injectable, signal, WritableSignal} from '@angular/core';
import {Album} from "./album";
import {Photo} from "./photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photos: Photo[] = new Array<Photo>();
  loaded: WritableSignal<boolean> = signal(false);
  loading: WritableSignal<boolean> = signal(false);
  constructor() { }

  findAll() {
    this.loaded.set(false);
    this.loading.set(true);
    fetch('http://localhost:5000/api/photos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => response.json())
      .then((data) => {
        this.loaded.set(true);
        this.loading.set(false);

        data['photos'].forEach((photo: any) => {
          console.log(photo);
          let photoObj = new Photo();
          photoObj.id.set(photo.id);
          photoObj.title.set(photo.title);

          this.photos.push(photoObj);
        });
      })
  }
}
