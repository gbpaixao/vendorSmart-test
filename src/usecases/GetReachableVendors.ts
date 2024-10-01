import { VendorRepository } from "../resources";

type Input = {
  locationId: number
  serviceCategoryId: number
}

type Ouput = {
  total: number
  compliant: number;
  notCompliant: number;
}

export class GetReachableVendors {

  constructor(
    private readonly vendorRepository: VendorRepository
  ) { }

  execute({ locationId, serviceCategoryId }: Input): Ouput {
    const vendors = this.vendorRepository.filterBy({ locationId, serviceCategoryId })
    const total = vendors?.length ?? 0
    const compliantVendorsCount = vendors?.filter((vendor) => vendor.serviceCategories.some((category) => category.compliant)).length ?? 0
    return { total, compliant: compliantVendorsCount, notCompliant: total - compliantVendorsCount }
  }
}