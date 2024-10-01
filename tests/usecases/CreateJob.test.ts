import { LocationMemoryRepository, ServiceCategoryMemoryRepository } from "../../src/resources"
import { CreateJob } from "../../src/usecases"

describe('CreateJob usecase', () => {
  test('Should create a new job', () => {
    const input = {
      name: 'Job 1',
      locationId: 1,
      serviceCategoryId: 2
    }
    const serviceCategoryDAO = new ServiceCategoryMemoryRepository()
    const locationDAO = new LocationMemoryRepository()
    const createJob = new CreateJob(locationDAO, serviceCategoryDAO)
    const job = createJob.execute(input)
    expect(job.id).toBeDefined()
    expect(job.name).toBe(input.name)
    expect(job.location.id).toBe(input.locationId)
    expect(job.serviceCategory.id).toBe(input.serviceCategoryId)
  })
})