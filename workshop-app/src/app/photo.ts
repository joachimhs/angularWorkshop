import {signal, WritableSignal} from "@angular/core";

export class Photo {
  id: WritableSignal<string> = signal("");
  title: WritableSignal<string> = signal("");

  loading: WritableSignal<boolean> = signal(false);
  loaded: WritableSignal<boolean> = signal(false);
}
