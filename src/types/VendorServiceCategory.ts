import { ServiceCategory } from "../domain/ServiceCategory"

export interface VendorServiceCategory extends ServiceCategory {
  compliant: boolean
}