import { Job } from "../domain";
import { LocationRepository, ServiceCategoryRepository } from "../resources";
import { JobRepository } from "../resources/JobRepository";

type Input = {
  name: string
  locationId: number
  serviceCategoryId: number
}

export class CreateJob {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly serviceCategoryRepository: ServiceCategoryRepository,
    private readonly jobRepository: JobRepository,
  ) { }

  execute({ name, locationId, serviceCategoryId }: Input) {
    const location = this.locationRepository.findLocationById(locationId);
    if (!location) throw new Error('Location does not exist')
    const serviceCategory = this.serviceCategoryRepository.findServiceCategoryById(serviceCategoryId)
    if (!serviceCategory) throw new Error('Service category does not exist')
    const job = new Job({
      name,
      location,
      serviceCategory
    })
    this.jobRepository.create(job)
    return job
  }
}