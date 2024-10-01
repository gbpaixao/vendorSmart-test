import { existsSync, readFileSync, writeFileSync } from "fs";

export interface FileDAO<T> {
  save: (data: T[]) => void
  load: () => T[]
}

export class FileSystemDAO<T> implements FileDAO<T> {

  constructor(private readonly filePath: string) { }

  save(data: T[]) {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  };

  load(): T[] {
    if (!existsSync(this.filePath)) {
      return [];
    }
    const data = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }
}