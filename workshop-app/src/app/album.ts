import {signal, WritableSignal} from "@angular/core";

export class Album {
  id: WritableSignal<string> = signal("");
  caption: WritableSignal<string> = signal("");
  image: WritableSignal<string> = signal("");
  images: WritableSignal<string[]> = signal([]);

  loading: WritableSignal<boolean> = signal(false);
  loaded: WritableSignal<boolean> = signal(false);
}
