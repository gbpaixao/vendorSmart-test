type ServiceCategoryInput = {
  id: number;
  name: string;
}

export class ServiceCategory {
  id: number;
  name: string;

  constructor({ id, name }: ServiceCategoryInput) {
    this.id = id
    this.name = name
  }
}