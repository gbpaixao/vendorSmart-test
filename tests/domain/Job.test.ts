import { Job } from "../../src/domain/Job"
import { Location } from "../../src/domain/Location"
import { ServiceCategory } from "../../src/domain/ServiceCategory"

describe('Job domain', () => {
  test('Should create a new job', () => {
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
    const jobInput = {
      name: 'Job 1',
      location: location,
      serviceCategory: serviceCategory,
    }
    const job = new Job(jobInput)

    expect(job.id).toBeDefined()
    expect(job.name).toBe(jobInput.name)
    expect(job.location.id).toBe(locationInput.id)
    expect(job.location.name).toBe(locationInput.name)
    expect(job.location.state).toBe(locationInput.state)
    expect(job.serviceCategory.id).toBe(serviceCategory.id)
    expect(job.serviceCategory.name).toBe(serviceCategory.name)
  })
})