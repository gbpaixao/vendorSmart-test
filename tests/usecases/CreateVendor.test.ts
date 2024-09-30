import { LocationMemoryDAO } from "../../src/resources/LocationDAO"
import { ServiceCategoryMemoryDAO } from "../../src/resources/ServiceCategoryDAO"
import { CreateVendor } from "../../src/usecases/CreateVendor"

describe('CreateVendor usecase', () => {
  test('Should create a new vendor', () => {
    const input = {
      name: 'Vendor 1',
      locationId: 1,
      serviceCategories: [{
        id: 1,
        compliant: true
      }]
    }
    const serviceCategoryDAO = new ServiceCategoryMemoryDAO()
    const locationDAO = new LocationMemoryDAO()
    const createVendor = new CreateVendor(locationDAO, serviceCategoryDAO)
    const vendor = createVendor.execute(input)
    expect(vendor.id).toBeDefined()
    expect(vendor.name).toBe(input.name)
    expect(vendor.location.id).toBe(input.locationId)
    expect(vendor.serviceCategories[0].id).toBe(input.serviceCategories[0].id)
    expect(vendor.serviceCategories[0].compliant).toBe(input.serviceCategories[0].compliant)
  })
})