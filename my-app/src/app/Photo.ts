import {PrimusRecord} from "./primus-store.service";
import {signal, WritableSignal} from "@angular/core";

export class Photo extends PrimusRecord {
  //id=id, image=image, caption=caption, images=images
  title: WritableSignal<string> = signal("");

  update(record : PrimusRecord, id: string) {
    if (record.json) {
      let model = record.json;

      this.id.set(model.id);
      this.title.set(model.title);

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
      title: this.title()
    }

    return record;
  }
}
