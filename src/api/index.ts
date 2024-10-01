import express from "express";

import { UUID } from "crypto";
import { JobJSONRepository, LocationMemoryRepository, ServiceCategoryMemoryRepository, VendorJSONRepository } from "../resources";
import { CreateJob, CreateVendor, FindVendorsForJob, GetReachableVendors } from "../usecases";
import { AuthMiddleware } from "./middlewares/auth";
import { errorHandling } from "./middlewares/error-handler";

const api = express()
api.use(express.json())

const serviceCategoryRepository = new ServiceCategoryMemoryRepository()
const locationRepository = new LocationMemoryRepository()
const jobRepository = new JobJSONRepository()
const vendorRepository = new VendorJSONRepository()

api.get('/', function (req, res) {
  res.send('API is running')
})

api.post('/create-job', AuthMiddleware, function (req, res) {
  const { name, locationId, serviceCategoryId } = req.body
  const createJob = new CreateJob(locationRepository, serviceCategoryRepository, jobRepository)
  const job = createJob.execute({ name, locationId, serviceCategoryId })
  res.status(200).json(job)
})

api.post('/create-vendor', AuthMiddleware, function (req, res) {
  const { name, locationId, serviceCategories } = req.body
  const createVendor = new CreateVendor(locationRepository, serviceCategoryRepository, vendorRepository)
  const vendor = createVendor.execute({ name, locationId, serviceCategories })
  res.status(200).json(vendor)
})

api.get('/get-reachable-vendors', function (req, res) {
  const { locationId, serviceCategoryId } = req.query
  const getReachableVendors = new GetReachableVendors(vendorRepository)
  const reachableVendors = getReachableVendors.execute({
    locationId: Number(locationId),
    serviceCategoryId: Number(serviceCategoryId)
  })
  res.status(200).json(reachableVendors)
})

api.get('/find-vendors-for-job', AuthMiddleware, function (req, res) {
  const { jobId } = req.query
  const findVendorsForJob = new FindVendorsForJob(jobRepository, vendorRepository)
  const vendors = findVendorsForJob.execute(jobId as UUID)
  res.status(200).json(vendors)
})

api.use(errorHandling);

const PORT = 3000
api.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})

export default api