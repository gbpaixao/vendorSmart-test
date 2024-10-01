import { JobMemoryRepository, LocationMemoryRepository, ServiceCategoryMemoryRepository, VendorMemoryRepository } from "../../src/resources"
import { CreateJob, CreateVendor } from "../../src/usecases"
import { GetReachableVendors } from "../../src/usecases/GetReachableVendors"

describe('GetReachableVendors usecase', () => {
  test('Should return base case when no vendor is reachable', () => {
    const input = {
      locationId: 1,
      serviceCategoryId: 1
    }
    const vendorRepository = new VendorMemoryRepository()
    const getReachableVendors = new GetReachableVendors(vendorRepository)
    const reachableVendors = getReachableVendors.execute(input)
    expect(reachableVendors.total).toBe(0)
    expect(reachableVendors.compliant).toBe(0)
    expect(reachableVendors.notCompliant).toBe(0)
  })

  test('Should fetch reachable vendors for a job', () => {
    const jobInput = {
      name: 'Job 1',
      locationId: 1,
      serviceCategoryId: 2
    }
    const vendorInput = [
      {
        name: 'Vendor 1',
        locationId: 1,
        serviceCategories: [{
          id: 1,
          compliant: true
        }]
      },
      {
        name: 'Vendor 2',
        locationId: 1,
        serviceCategories: [{
          id: 1,
          compliant: false
        }]
      },
      {
        name: 'Vendor 3',
        locationId: 1,
        serviceCategories: [{
          id: 1,
          compliant: true
        }]
      }
    ]
    const serviceCategoryRepository = new ServiceCategoryMemoryRepository()
    const locationRepository = new LocationMemoryRepository()
    const jobRepository = new JobMemoryRepository()
    const vendorRepository = new VendorMemoryRepository()
    const createJob = new CreateJob(locationRepository, serviceCategoryRepository, jobRepository)
    const createVendor = new CreateVendor(locationRepository, serviceCategoryRepository, vendorRepository)
    const getReachableVendors = new GetReachableVendors(vendorRepository)
    createJob.execute(jobInput)
    createVendor.execute(vendorInput[0])
    createVendor.execute(vendorInput[1])
    createVendor.execute(vendorInput[2])
    const reachableVendors = getReachableVendors.execute({
      locationId: jobInput.locationId,
      serviceCategoryId: jobInput.serviceCategoryId
    })
    expect(reachableVendors.total).toBe(3)
    expect(reachableVendors.compliant).toBe(2)
    expect(reachableVendors.notCompliant).toBe(1)
  })
})