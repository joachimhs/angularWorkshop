import {Routes} from '@angular/router';
import {AlbumIndexComponentComponent} from "./album-index-component/album-index-component.component";
import {AlbumComponent} from "./album/album.component";
import {PhotoComponent} from "./photo/photo.component";


export const routes: Routes = [
  {path: '', component: AlbumIndexComponentComponent},
  {path: 'album/:albumid', children: [
      {path: '', component: AlbumComponent},
      {path: 'photo/:photoid', pathMatch: 'full', component: PhotoComponent}
  ]},

];
