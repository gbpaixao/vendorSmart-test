import { serviceCategories } from "../data";
import { ServiceCategory } from "../domain";

export interface ServiceCategoryRepository {
  findServiceCategoryById: (id: number) => ServiceCategory | undefined
}

export class ServiceCategoryMemoryRepository implements ServiceCategoryRepository {
  serviceCategories: ServiceCategory[]

  constructor() {
    this.serviceCategories = serviceCategories
  }

  findServiceCategoryById(id: number): ServiceCategory | undefined {
    return this.serviceCategories.find(serviceCategory => serviceCategory.id === id)
  }
}