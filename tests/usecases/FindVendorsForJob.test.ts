import { JobMemoryRepository, LocationMemoryRepository, ServiceCategoryMemoryRepository, VendorMemoryRepository } from "../../src/resources"
import { CreateJob, CreateVendor } from "../../src/usecases"
import { FindVendorsForJob } from "../../src/usecases/FindVendorsForJob"
import { getJobMockData, getVendorsMockData } from "../helpers"


describe('FindVendorsForJob usecase', () => {
  test('Should fetch vendors for a specific job', () => {
    const jobInput = getJobMockData()
    const vendorInput = getVendorsMockData()
    const serviceCategoryRepository = new ServiceCategoryMemoryRepository()
    const locationRepository = new LocationMemoryRepository()
    const vendorRepository = new VendorMemoryRepository()
    const jobRepository = new JobMemoryRepository()
    const findVendorsForJob = new FindVendorsForJob(jobRepository, vendorRepository)
    const createJob = new CreateJob(locationRepository, serviceCategoryRepository, jobRepository)
    const createVendor = new CreateVendor(locationRepository, serviceCategoryRepository, vendorRepository)
    const job = createJob.execute(jobInput)
    createVendor.execute(vendorInput[0])
    createVendor.execute(vendorInput[1])
    createVendor.execute(vendorInput[2])
    const vendors = findVendorsForJob.execute(job.id)
    expect(vendors?.length).toBe(3)
    expect(vendors?.[0].name).toEqual(vendorInput[2].name)
    expect(vendors?.[1].name).toEqual(vendorInput[0].name)
    expect(vendors?.[2].name).toEqual(vendorInput[1].name)
  })
})