import { Injectable } from '@angular/core';
import {ModelType, PrimusRecord, PrimusStoreService} from "./primus-store.service";
import {Album} from "./Album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albums: Album[] = new Array<Album>();
  album: Album = new Album("");

  constructor(public primusStore : PrimusStoreService) {
    primusStore.registerModel(new ModelType("album", "albums", "http://127.0.0.1:5000/api/"));
  }

  findAll(): Album[] {
    this.albums = new Array<Album>();
    let self = this;
    this.primusStore.findAll('album').then(data => {
      console.log("album service findall: ");
      console.log(data);
      self.albums = new Array<Album>();

      data.data.forEach((value: any, key: string) => {
        let album = new Album("");
        album.update(value, key);
        this.albums.push(album);
      });
    });

    return this.albums;
  }

  find(id: any): Album {
    this.album.loading.set(true);

    this.primusStore.find('album', id).then(record => {
      if (id != null) {
        this.album.update(record, id);
      }
    });

    return this.album;
  }
}
