import { ServiceCategory } from "../../src/domain/ServiceCategory"

describe('ServiceCategory domain', () => {
  test('Should create a new service category', () => {
    const serviceCategoryInput = {
      id: 1,
      name: 'Air Conditioning'
    }
    const serviceCategory = new ServiceCategory(serviceCategoryInput)
    expect(serviceCategory.id).toBe(serviceCategoryInput.id)
    expect(serviceCategory.name).toBe(serviceCategoryInput.name)
  })
})