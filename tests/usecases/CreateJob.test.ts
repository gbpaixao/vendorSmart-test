import { LocationMemoryDAO } from "../../src/resources/LocationDAO"
import { ServiceCategoryMemoryDAO } from "../../src/resources/ServiceCategoryDAO"
import { CreateJob } from "../../src/usecases/CreateJob"

describe('CreateJob usecase', () => {
  test('Should create a new job', () => {
    const input = {
      name: 'Job 1',
      locationId: 1,
      serviceCategoryId: 2
    }
    const serviceCategoryDAO = new ServiceCategoryMemoryDAO()
    const locationDAO = new LocationMemoryDAO()
    const createJob = new CreateJob(locationDAO, serviceCategoryDAO)
    const job = createJob.execute(input)
    expect(job.id).toBeDefined()
    expect(job.name).toBe(input.name)
    expect(job.location.id).toBe(input.locationId)
    expect(job.serviceCategory.id).toBe(input.serviceCategoryId)
  })
})