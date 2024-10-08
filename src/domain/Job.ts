import { randomUUID, UUID } from "crypto";
import { ServiceCategory } from ".";
import { Location } from "./Location";

type JobInput = {
  serviceCategory: ServiceCategory
  location: Location
  name: string
}

export class Job {
  id: UUID;
  name: string;
  location: Location;
  serviceCategory: ServiceCategory

  constructor({ serviceCategory, location, name }: JobInput) {
    this.id = randomUUID()
    this.name = name
    this.location = location
    this.serviceCategory = serviceCategory
  }
}