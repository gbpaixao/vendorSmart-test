import { Vendor } from "../domain/Vendor";
import { LocationDAO } from "../resources/LocationDAO";
import { ServiceCategoryDAO } from "../resources/ServiceCategoryDAO";
import { VendorServiceCategory } from "../types/VendorServiceCategory";

export class CreateVendor {
  constructor(
    private readonly locationDAO: LocationDAO,
    private readonly serviceCategoryDAO: ServiceCategoryDAO,
  ) { }

  execute(name: string, locationId: number, serviceCategoriesInput: { id: number, compliant: boolean }[]) {
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