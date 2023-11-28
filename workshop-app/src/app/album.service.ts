import {Injectable, signal, WritableSignal} from '@angular/core';
import {Album} from "./album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albums: Album[] = new Array<Album>();
  loaded: WritableSignal<boolean> = signal(false);
  loading: WritableSignal<boolean> = signal(false);
  constructor() { }

  findAll() {
    this.loaded.set(false);
    this.loading.set(true);
    fetch('http://localhost:5000/api/albums', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => response.json())
      .then((data) => {
      this.loaded.set(true);
      this.loading.set(false);

      data['albums'].forEach((album: any) => {
        console.log(album);
        let albumObj = new Album();
        albumObj.id.set(album.id);
        albumObj.caption.set(album.caption);
        albumObj.image.set(album.image);
        albumObj.images.set(album.images);

        this.albums.push(albumObj);
      });
    })
  }
}
