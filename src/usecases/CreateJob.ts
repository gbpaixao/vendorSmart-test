import { Job } from "../domain";
import { LocationRepository, ServiceCategoryRepository } from "../resources";

type Input = {
  name: string
  locationId: number
  serviceCategoryId: number
}

export class CreateJob {
  constructor(
    private readonly locationDAO: LocationRepository,
    private readonly serviceCategoryDAO: ServiceCategoryRepository,
  ) { }

  execute({ name, locationId, serviceCategoryId }: Input) {
    const location = this.locationDAO.findLocationById(locationId);
    if (!location) throw new Error('Location does not exist')
    const serviceCategory = this.serviceCategoryDAO.findServiceCategoryById(serviceCategoryId)
    if (!serviceCategory) throw new Error('Service category does not exist')
    const job = new Job({
      name,
      location,
      serviceCategory
    })
    return job
  }
}