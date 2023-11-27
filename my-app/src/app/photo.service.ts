import { Injectable } from '@angular/core';
import {Photo} from "./Photo";
import {ModelType, PrimusStoreService} from "./primus-store.service";
import {Album} from "./Album";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photos: Photo[] = new Array<Photo>();
  photo: Photo = new Photo("");
  constructor(public primusStore: PrimusStoreService) {
    primusStore.registerModel(new ModelType("photo", "photos", "http://127.0.0.1:5000/api/"));
  }

  findAll(): Photo[] {
    this.photos = new Array<Photo>();
    let self = this;
    this.primusStore.findAll('photo').then(data => {
      self.photos = new Array<Photo>();

      data.data.forEach((value: any, key: string) => {
        let album = new Photo("");
        album.update(value, key);
        this.photos.push(album);
      });
    });

    return this.photos;
  }

  find(id: any): Photo {
    this.photo.loading.set(true);

    this.primusStore.find('photo', id).then(record => {
      if (id != null) {
        this.photo.update(record, id);
      }
    });

    return this.photo;
  }
}
