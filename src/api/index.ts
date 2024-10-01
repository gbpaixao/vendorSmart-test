import express from "express";

import { UUID } from "crypto";
import { LocationMemoryRepository, ServiceCategoryMemoryRepository } from "../resources";
import { JobJSONRepository } from "../resources/JobRepository";
import { VendorJSONRepository } from "../resources/VendorRepository";
import { CreateJob, CreateVendor } from "../usecases";
import { FindVendorsForJob } from "../usecases/FindVendorsForJob";
import { GetReachableVendors } from "../usecases/GetReachableVendors";
import { AuthMiddleware } from "./middlewares/auth";

const api = express()
api.use(express.json())

api.get('/', function (req, res) {
  res.send('API is running')
})

const serviceCategoryRepository = new ServiceCategoryMemoryRepository()
const locationRepository = new LocationMemoryRepository()
const jobRepository = new JobJSONRepository()
const vendorRepository = new VendorJSONRepository()

api.post('/create-job', AuthMiddleware, function (req, res) {
  const { name, locationId, serviceCategoryId } = req.body
  // error handling
  const createJob = new CreateJob(locationRepository, serviceCategoryRepository, jobRepository)
  const job = createJob.execute({ name, locationId, serviceCategoryId })
  res.status(200).json(job)
})

api.post('/create-vendor', AuthMiddleware, function (req, res) {
  const { name, locationId, serviceCategories } = req.body
  // error handling
  const createVendor = new CreateVendor(locationRepository, serviceCategoryRepository, vendorRepository)
  const vendor = createVendor.execute({ name, locationId, serviceCategories })
  res.status(200).json(vendor)
})

api.get('/get-reachable-vendors', function (req, res) {
  const { locationId, serviceCategoryId } = req.query
  // error handling
  const getReachableVendors = new GetReachableVendors(vendorRepository)
  const reachableVendors = getReachableVendors.execute({
    locationId: Number(locationId),
    serviceCategoryId: Number(serviceCategoryId)
  })
  res.status(200).json(reachableVendors)
})

api.get('/find-vendors-for-job', AuthMiddleware, function (req, res) {
  const { jobId } = req.query
  // error handling
  const findVendorsForJob = new FindVendorsForJob(jobRepository, vendorRepository)
  const vendors = findVendorsForJob.execute(jobId as UUID)
  res.status(200).json(vendors)
})



const PORT = 3000
api.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})

export default api