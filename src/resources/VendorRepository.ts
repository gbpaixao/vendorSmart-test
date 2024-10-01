import { UUID } from 'crypto';
import { FileSystemDAO } from '.';
import { Vendor } from "../domain";

export interface VendorRepository {
  findById: (id: UUID) => Vendor | undefined
  create: (vendor: Vendor) => void
}

export class VendorMemoryRepository implements VendorRepository {
  fileSystem = new FileSystemDAO<Vendor>('src/data/vendors.json')
  vendors: Vendor[] = this.fileSystem.load();

  constructor() { }

  findById(id: UUID): Vendor | undefined {
    return this.vendors.find(vendor => vendor.id === id);
  }

  create(vendor: Vendor): void {
    this.vendors.push(vendor);
    this.fileSystem.save(this.vendors);
  }
}