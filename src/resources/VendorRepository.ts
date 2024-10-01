import { UUID } from 'crypto';
import { FileSystemDAO } from '.';
import { Vendor } from "../domain";

type Filter = {
  categoryId: number
  locationId: number
}

export interface VendorRepository {
  findById: (id: UUID) => Vendor | undefined
  filterBy: (filter: Filter) => Vendor[] | undefined
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

  filterBy({ categoryId, locationId }: Filter): Vendor[] | undefined {
    return this.vendors
      .filter(vendor => vendor.location.id === locationId)
      .filter((vendor) => vendor.serviceCategories.filter(category => category.id === categoryId))
  }
}