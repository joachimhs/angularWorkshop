import { Routes } from '@angular/router';
import {AlbumIndexComponent} from "./album-index/album-index.component";
import {PhotoalbumComponent} from "./photoalbum/photoalbum.component";

export const routes: Routes = [
  {path: '', component: AlbumIndexComponent},
  {path: 'album/:albumid', component: PhotoalbumComponent}
];
