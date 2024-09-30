import express from "express";
import { Job } from "./domain/Job";
import { Vendor } from "./domain/Vendor";
import { LocationMemoryDAO } from "./resources/LocationDAO";
import { ServiceCategoryMemoryDAO } from "./resources/ServiceCategoryDAO";
import { CreateJob } from "./usecases/CreateJob";
import { CreateVendor } from "./usecases/CreateVendor";

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
  res.send('API is running')
})

const serviceCategoryDAO = new ServiceCategoryMemoryDAO()
const locationDAO = new LocationMemoryDAO()
// persist that on a json or ts file;
const jobs: Job[] = []
const vendors: Vendor[] = []

app.post('/create-job', function (req, res) {
  const { name, locationId, serviceCategoryId } = req.body
  // error handling
  const createJob = new CreateJob(locationDAO, serviceCategoryDAO)
  const job = createJob.execute({ name, locationId, serviceCategoryId })
  jobs.push(job)
  console.log('jobs', jobs)
  res.status(200).json(job)
})

app.post('/create-vendor', function (req, res) {
  const { name, locationId, serviceCategories } = req.body
  // error handling
  const createVendor = new CreateVendor(locationDAO, serviceCategoryDAO)
  const vendor = createVendor.execute({ name, locationId, serviceCategories })
  vendors.push(vendor)
  console.log('vendors', vendors)
  res.status(200).json(vendor)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})