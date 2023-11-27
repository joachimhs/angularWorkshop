import {PrimusRecord} from "./primus-store.service";
import {signal, WritableSignal} from "@angular/core";

export class Album extends PrimusRecord {
  //id=id, image=image, caption=caption, images=images
  image: WritableSignal<string> = signal("");
  caption: WritableSignal<string> = signal("");
  images: WritableSignal<string> = signal("");

  update(record : PrimusRecord, id: string) {
    if (record.json) {
      let model = record.json;

      this.id.set(model.id);
      this.image.set(model.image);
      this.caption.set(model.caption);
      this.images.set(model.images);

      this.loaded.set(record.loaded());
      this.loading.set(record.loading());
      this.error.set(record.error());
      this.errorMessages.set(record.errorMessages());
    }
  }

  toModel(): PrimusRecord {
    let record = new PrimusRecord(this.id());
    record.json = {
      id: this.id(),
      image: this.image(),
      caption: this.caption(),
      images: this.images()
    }

    return record;
  }
}
