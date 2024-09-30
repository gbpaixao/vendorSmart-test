
import { serviceCategories } from "../data/serviceCategories";
import { ServiceCategory } from "../domain/ServiceCategory";

export interface ServiceCategoryDAO {
  findServiceCategoryById: (id: number) => ServiceCategory | undefined
}

export class ServiceCategoryMemoryDAO implements ServiceCategoryDAO {
  serviceCategories: ServiceCategory[]

  constructor() {
    this.serviceCategories = serviceCategories
  }

  findServiceCategoryById(id: number): ServiceCategory | undefined {
    return this.serviceCategories.find(serviceCategory => serviceCategory.id === id)
  }
}