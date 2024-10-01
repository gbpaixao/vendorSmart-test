import { ServiceCategory } from "../domain"

export interface VendorServiceCategory extends ServiceCategory {
  compliant: boolean
}