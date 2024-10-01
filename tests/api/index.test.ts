import axios from "axios";
import { GetReachableVendorsOuput } from "../../src/usecases";

describe('Api Test', () => {
  test('/get-reachable-vendors endpoint', async () => {
    const locationId = 10;
    const serviceCategoryId = 2;
    const { data: vendors } =
      await axios.get<GetReachableVendorsOuput>(`http://localhost:3000/get-reachable-vendors?locationId=${locationId}&serviceCategoryId=${serviceCategoryId}`)
    expect(vendors.total).toBe(3)
    expect(vendors.compliant).toBe(1)
    expect(vendors.notCompliant).toBe(2)
  })
})