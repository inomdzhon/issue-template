import { IStorageService } from './typing/interfaces';
import { TStorageData } from './typing/types';

export class StorageService implements IStorageService {
  set(key: string, value: any): Promise<void> {
    return new Promise<void>(function (resolve) {
      chrome.storage.local.set({ [key]: { value } }, resolve);
    });
  }

  get<T>(key: string): Promise<T | null> {
    return new Promise<T | null>(function (resolve) {
      chrome.storage.local.get(key, function (items) {
        const value = items[key] ? (items[key] as TStorageData<T>).value : null;
        resolve(value);
      });
    });
  }

  remove(key: string): Promise<void> {
    return new Promise<void>(function (resolve) {
      chrome.storage.local.remove(key, resolve);
    });
  }
}
