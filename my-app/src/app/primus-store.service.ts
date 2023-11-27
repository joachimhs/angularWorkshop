import {Injectable, signal, WritableSignal} from "@angular/core";

export interface PrimusStoreState {
  loading: WritableSignal<boolean>;
  loaded: WritableSignal<boolean>;
  error: WritableSignal<boolean>;
  errorMessages: WritableSignal<string[]>;
}

export class PrimusRecord implements PrimusStoreState {
  id: WritableSignal<string>;
  json: any;
  loading = signal(false);
  loaded = signal(false);
  error = signal(false);
  errorMessages = signal(new Array<string>());

  constructor(id: string) {
    this.id = signal(id);
    this.json = null;
    this.loaded.set(true);
    this.loading.set(false);
    this.error.set(false);
  }

}

export interface PrimusStoreObject extends PrimusStoreState {
  data: Map<string, PrimusStoreState>;
}

export class PrimusStoreModel implements PrimusStoreObject {
  data = new Map<string, PrimusStoreState>();
  loading = signal(false);
  loaded = signal(false);
  error = signal(false);
  errorMessages = signal(new Array<string>());
}

export class ModelType {
  singularModelName: string;
  pluralModelName: string;
  url: string;

  constructor(singularModelName: string, pluralModelName: string, url: string) {
    this.singularModelName = singularModelName;
    this.pluralModelName = pluralModelName;
    this.url = url;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PrimusStoreService {
  private registeredModels: Map<string, ModelType> = new Map<string, ModelType>
  private store: {};

  constructor() {
    this.store = new PrimusStoreModel();
  }

  registerModel(modelType: ModelType) {
    this.registeredModels.set(modelType.singularModelName, modelType);
  }

  public getModelStore(modelName: string) {
    // @ts-ignore
    if (!this.store[modelName]) {
      // @ts-ignore
      this.store[modelName] = new PrimusStoreModel();
    }

    // @ts-ignore
    return this.store[modelName];
  }

  delete(modelName: string, id: string): Promise<PrimusStoreState> {
    let modelStore = this.getModelStore(modelName);

    return new Promise((resolve, reject) => {
      let modelType = this.registeredModels.get(modelName);

      if (modelType !== undefined) {
        fetch(modelType.url + modelType.pluralModelName + "/" + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }).then(() => {
          modelStore.data.delete(id);
          resolve(modelStore);
        });
      } else {
        reject(modelStore);
      }
    });

  }

  update(modelName: string, id: string, model: PrimusRecord): Promise<PrimusRecord> {
    let modelStore = this.getModelStore(modelName);

    let record = modelStore.data.get(id);
    if (record) {
      record.loaded.set(false);
      record.loading.set(true);
      record.error.set(false);

      model.loaded.set(false);
      model.loading.set(true);
      model.error.set(false);
    }

    return new Promise((resolve, reject) => {
      let modelType = this.registeredModels.get(modelName);
      if (!modelType) {
        reject(modelStore);
      } else {
        let jsonData = {};
        // @ts-ignore
        jsonData[modelType.singularModelName] = model.json;
        fetch(modelType.url + modelType.pluralModelName + "/" + id, {
          method: 'PUT',
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }).then(response => response.json())
          .catch((err) => {
            modelStore.loaded.set(false);
            modelStore.loading.set(false);
            modelStore.error.set(false);
            // @ts-ignore
            modelStore.errorMessages().push("Unable to put " + modelType.singularModelName + " from API: " + err);

            reject(modelStore)
          })
          .then((data) => {
            console.log("PrimusStoreService -> update finished with data:");
            console.log(data);

            // @ts-ignore
            record.json = data[modelType.singularModelName];
            record.loaded.set(true);
            record.loading.set(false);
            record.error.set(false);
            // TODO: Remove error messages

            modelStore.data.set(id, record);
            console.log(record);

            resolve(record);
          })
      }
    }); //promise
  }

  findAll(modelName: string): Promise<PrimusStoreModel> {
    let modelStore = this.getModelStore(modelName);

    return new Promise((resolve, reject) => {
      let modelType = this.registeredModels.get(modelName);
      if (!modelType || modelType.pluralModelName === null || modelType.singularModelName === null) {
        modelStore.loaded.set(false);
        modelStore.loading.set(false);
        modelStore.error.set(false);
        modelStore.errorMessages().push("Both pluralModelName and singularModelName needs to be set");

        reject(modelStore);
      } else {

        console.log("Fetching all: " + modelType.pluralModelName);

        if (modelType.pluralModelName && !modelStore.loaded()) {
          modelStore.loading.set(true);
          fetch(modelType.url + modelType.pluralModelName, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }).then((response) => response.json())
            .catch((err) => {
              modelStore.loaded.set(false);
              modelStore.loading.set(false);
              modelStore.error.set(false);
              // @ts-ignore
              modelStore.errorMessages().push("Unable to fetch all " + modelType.singularModelName + " from API: " + err);
            })
            .then((data) => {
              // @ts-ignore
              console.log(data[modelType.pluralModelName]);
              // @ts-ignore
              data[modelType.pluralModelName].forEach(model => {

                console.log("primusStore findAll -> forEach: " + model.id);
                console.log(model);

                let record = new PrimusRecord(model.id);
                record.json = model;
                record.loaded.set(true);
                record.loading.set(false);
                record.error.set(false);

                modelStore.data.set(model.id, record);
              });

              modelStore.loaded.set(true);
              modelStore.loading.set(false);
              modelStore.error.set(false);
              console.log(this.store);
              resolve(modelStore);
            });
        } else if (modelStore.loaded()) {
          resolve(modelStore);
        }
      }
    });
  }

  reload(modelName: string, model: PrimusRecord): Promise<PrimusRecord> {
    let modelStore = this.getModelStore(modelName);
    console.log('reloading model');

    modelStore.data.get(model.id()).json = null;
    model.loaded.set(false);
    model.loading.set(true);
    model.error.set(false);

    return this.find(modelName, model.id());
  }

  reloadAll(modelName: string): Promise<PrimusStoreModel> {
    // @ts-ignore
    this.store[modelName] = new PrimusStoreModel();

    return this.findAll(modelName);
  }

  find(modelName: string, id: string | null): Promise<PrimusRecord> {
    let modelStore = this.getModelStore(modelName);

    return new Promise((resolve, reject) => {
      let modelType = this.registeredModels.get(modelName);

      if (!modelType || modelType.pluralModelName === null || modelType.singularModelName === null) {
        modelStore.loaded.set(false);
        modelStore.loading.set(false);
        modelStore.error.set(false);
        modelStore.errorMessages().push("Both pluralModelName and singularModelName needs to be set");

        reject(this.store);
      } else if (id == null) {
        modelStore.loaded.set(false);
        modelStore.loading.set(false);
        modelStore.error.set(false);
        modelStore.errorMessages().push("find(id) needs a non-null ID!");

        reject(this.store);
      } else {
        console.log("Fetching ID: " + id + " for: " + modelType.pluralModelName);
        console.log("has id: " + modelStore.data.has(id));

        if (!modelStore.data.has(id) || !modelStore.data.get(id).json) {
          let record = new PrimusRecord(id);
          record.loaded.set(false);
          record.loading.set(true);
          record.error.set(false);
          modelStore.data.set(id, record);

          fetch(modelType.url + modelType.pluralModelName + "/" + id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }).then((response) => response.json())
            .catch((err) => {
              record.loaded.set(false);
              record.loading.set(false);
              record.error.set(true);
              // @ts-ignore
              record.errorMessages().push("Unable to fetch " + modelType.singularModelName + " from API: " + err);
            })
            .then((data) => {
              // @ts-ignore
              console.log("primusStore find -> then: " + modelType.singularModelName);
              console.log(data);
              // @ts-ignore
              console.log(data[modelType.singularModelName]);

              // @ts-ignore
              record.json = data[modelType.singularModelName];
              record.loaded.set(true);
              record.loading.set(false);
              record.error.set(false);
              // TODO: Remove error messages

              modelStore.data.set(id, record);
              console.log(record);

              resolve(record);
            });
        } else {
          console.log('primusStore has Model: ' + modelName);
          console.log(modelStore.data.get(id));
          // @ts-ignore
          resolve(modelStore.data.get(id));
        }
      }
    });
  }
}
