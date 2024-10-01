import { Vendor } from "../domain";
import { LocationRepository, ServiceCategoryRepository } from "../resources";
import { VendorServiceCategory } from "../types/VendorServiceCategory";

type Input = {
  name: string,
  locationId: number,
  serviceCategories: { id: number, compliant: boolean }[]
}

export class CreateVendor {
  constructor(
    private readonly locationDAO: LocationRepository,
    private readonly serviceCategoryDAO: ServiceCategoryRepository,
  ) { }

  execute({ name, locationId, serviceCategories: serviceCategoriesInput }: Input) {
    const location = this.locationDAO.findLocationById(locationId);
    if (!location) throw new Error('Location does not exist')
    const serviceCategories: VendorServiceCategory[] = serviceCategoriesInput.map((category) => {
      const serviceCategory = this.serviceCategoryDAO.findServiceCategoryById(category.id)
      if (!serviceCategory) throw new Error('Service category does not exist')
      return {
        ...serviceCategory,
        compliant: category.compliant
      }
    })
    const vendor = new Vendor({
      name,
      location,
      serviceCategories
    })
    return vendor
  }
}