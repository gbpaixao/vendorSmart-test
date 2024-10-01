import express from "express";

import { LocationMemoryRepository, ServiceCategoryMemoryRepository } from "../resources";
import { JobJSONRepository } from "../resources/JobRepository";
import { VendorJSONRepository } from "../resources/VendorRepository";
import { CreateJob, CreateVendor } from "../usecases";
import { GetReachableVendors } from "../usecases/GetReachableVendors";
import { AuthMiddleware } from "./middlewares/auth";

const api = express()
api.use(express.json())

api.get('/', function (req, res) {
  res.send('API is running')
})

const serviceCategoryRepository = new ServiceCategoryMemoryRepository()
const locationRepository = new LocationMemoryRepository()
const jobMemoryRepository = new JobJSONRepository()
const vendorMemoryRepository = new VendorJSONRepository()

api.post('/create-job', AuthMiddleware, function (req, res) {
  const { name, locationId, serviceCategoryId } = req.body
  // error handling
  const createJob = new CreateJob(locationRepository, serviceCategoryRepository, jobMemoryRepository)
  const job = createJob.execute({ name, locationId, serviceCategoryId })
  res.status(200).json(job)
})

api.post('/create-vendor', AuthMiddleware, function (req, res) {
  const { name, locationId, serviceCategories } = req.body
  // error handling
  const createVendor = new CreateVendor(locationRepository, serviceCategoryRepository, vendorMemoryRepository)
  const vendor = createVendor.execute({ name, locationId, serviceCategories })
  res.status(200).json(vendor)
})

api.get('/get-reachable-vendors', function (req, res) {
  const { locationId, serviceCategoryId } = req.query
  // error handling
  const getReachableVendors = new GetReachableVendors(vendorMemoryRepository)
  const reachableVendors = getReachableVendors.execute({
    locationId: Number(locationId),
    serviceCategoryId: Number(serviceCategoryId)
  })
  res.status(200).json(reachableVendors)
})

const PORT = 3000
api.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})

export default api