export interface IStorageService {
  set(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
}
