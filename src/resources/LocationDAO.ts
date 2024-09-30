import { locations } from "../data/locations";
import { Location } from "../domain/Location";

export interface LocationDAO {
  findLocationById: (id: number) => Location | undefined
}

export class LocationMemoryDAO implements LocationDAO {
  locations: Location[]

  constructor() {
    this.locations = locations
  }

  findLocationById(id: number): Location | undefined {
    return this.locations.find(location => location.id === id)
  }
}