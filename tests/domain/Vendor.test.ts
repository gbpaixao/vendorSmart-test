import { Location } from "../../src/domain/Location"
import { ServiceCategory } from "../../src/domain/ServiceCategory"
import { Vendor } from "../../src/domain/Vendor"

describe('Vendor domain', () => {
  test('Should create a new vendor', () => {
    const locationInput = {
      id: 1,
      name: 'Dallas',
      state: 'TX'
    }
    const location = new Location(locationInput)
    const serviceCategoryInput = {
      id: 1,
      name: 'Air Conditioning'
    }
    const serviceCategory = new ServiceCategory(serviceCategoryInput)
    const vendorInput = {
      name: 'Vendor 1',
      location: location,
      serviceCategories: [serviceCategory].map((category) => ({ ...category, compliant: false }))
    }
    const vendor = new Vendor(vendorInput)
    expect(vendor.id).toBeDefined()
    expect(vendor.name).toBe(vendorInput.name)
    expect(vendor.location.id).toBe(locationInput.id)
    expect(vendor.location.name).toBe(locationInput.name)
    expect(vendor.location.state).toBe(locationInput.state)
    expect(vendor.serviceCategories[0].id).toBe(serviceCategory.id)
    expect(vendor.serviceCategories[0].name).toBe(serviceCategory.name)
    expect(vendor.serviceCategories[0].compliant).toBe(false)
  })
})