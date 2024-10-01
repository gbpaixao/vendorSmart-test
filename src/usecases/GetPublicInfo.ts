import { VendorRepository } from "../resources";

export class GetPublicInfo {

  constructor(
    private readonly vendorRepository: VendorRepository
  ) { }

  execute(locationId: number, categoryId: number) {
    const vendors = this.vendorRepository
      .filterBy({ locationId, categoryId })
    const total = vendors?.length ?? 0
    const compliantVendors = vendors?.filter((vendor) => vendor.serviceCategories.some((category) => category.compliant)).length ?? 0
    return { total, compliant: compliantVendors, notCompliant: total - compliantVendors }
  }
}