import { LocationMemoryRepository, ServiceCategoryMemoryRepository, VendorMemoryRepository } from "../../src/resources"
import { CreateVendor } from "../../src/usecases"
import { getVendorsMockData } from "../helpers"

describe('CreateVendor usecase', () => {
  test('Should create a new vendor', () => {
    const input = getVendorsMockData()[0]
    const serviceCategoryRepository = new ServiceCategoryMemoryRepository()
    const locationRepository = new LocationMemoryRepository()
    const vendorRepository = new VendorMemoryRepository()
    const createVendor = new CreateVendor(locationRepository, serviceCategoryRepository, vendorRepository)
    const vendor = createVendor.execute(input)
    expect(vendor.id).toBeDefined()
    expect(vendor.name).toBe(input.name)
    expect(vendor.location.id).toBe(input.locationId)
    expect(vendor.serviceCategories[0].id).toBe(input.serviceCategories[0].id)
    expect(vendor.serviceCategories[0].compliant).toBe(input.serviceCategories[0].compliant)
  })
})