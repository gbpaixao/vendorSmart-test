import { randomUUID, UUID } from "crypto";
import { Location } from ".";
import { VendorServiceCategory } from "../types/VendorServiceCategory";

type VendorInput = {
  serviceCategories: VendorServiceCategory[]
  location: Location
  name: string
}

export class Vendor {
  id: UUID;
  name: string;
  location: Location;
  serviceCategories: VendorServiceCategory[]

  constructor({ name, location, serviceCategories = [] }: VendorInput) {
    this.id = randomUUID()
    this.name = name
    this.location = location
    this.serviceCategories = serviceCategories
  }
}