import { locations } from "../data";
import { Location } from "../domain";

export interface LocationRepository {
  findLocationById: (id: number) => Location | undefined
}

export class LocationMemoryRepository implements LocationRepository {
  locations: Location[]

  constructor() {
    this.locations = locations
  }

  findLocationById(id: number): Location | undefined {
    return this.locations.find(location => location.id === id)
  }
}