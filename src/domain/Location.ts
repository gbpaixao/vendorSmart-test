type LocationInput = {
  id: number;
  name: string;
  state: string;
}

export class Location {
  id: number;
  name: string;
  state: string;
  constructor({ id, name, state }: LocationInput) {
    this.id = id
    this.name = name
    this.state = state
  }
}