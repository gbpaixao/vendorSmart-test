import { UUID } from "crypto";
import { Vendor } from "../domain";
import { JobRepository, VendorRepository } from "../resources";

export class FindVendorsForJob {

  constructor(
    private readonly jobRepository: JobRepository,
    private readonly vendorRepository: VendorRepository
  ) { }

  execute(jobId: UUID): Vendor[] | undefined {
    const job = this.jobRepository.findById(jobId)
    if (!job) throw new Error('Job not found')
    const vendors = this.vendorRepository.filterBy({
      locationId: job.location.id,
      serviceCategoryId: job.serviceCategory.id
    })
    return vendors?.sort((a, b) => {
      const isACategoryCompliant = a.serviceCategories.find(cat => cat.id === job.serviceCategory.id)?.compliant
      const isBCategoryCompliant =  b.serviceCategories.find(cat => cat.id === job.serviceCategory.id)?.compliant
      if (isACategoryCompliant === isBCategoryCompliant) return 0
      else if (isACategoryCompliant === true) return -1
      else return 1
    })
  }
}