import express from "express";

import { Job, Vendor } from "../domain";
import { LocationMemoryRepository, ServiceCategoryMemoryRepository } from "../resources";
import { CreateJob, CreateVendor } from "../usecases";

const api = express()
api.use(express.json())

api.get('/', function (req, res) {
  res.send('API is running')
})

const serviceCategoryDAO = new ServiceCategoryMemoryRepository()
const locationDAO = new LocationMemoryRepository()
// persist that on a json or ts file;
const jobs: Job[] = []
const vendors: Vendor[] = []

api.post('/create-job', function (req, res) {
  const { name, locationId, serviceCategoryId } = req.body
  // error handling
  const createJob = new CreateJob(locationDAO, serviceCategoryDAO)
  const job = createJob.execute({ name, locationId, serviceCategoryId })
  jobs.push(job)
  console.log('jobs', jobs)
  res.status(200).json(job)
})

api.post('/create-vendor', function (req, res) {
  const { name, locationId, serviceCategories } = req.body
  // error handling
  const createVendor = new CreateVendor(locationDAO, serviceCategoryDAO)
  const vendor = createVendor.execute({ name, locationId, serviceCategories })
  vendors.push(vendor)
  console.log('vendors', vendors)
  res.status(200).json(vendor)
})

const PORT = 3000
api.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})

export default api