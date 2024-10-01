import { Location } from "../../src/domain"

describe('Location domain', () => {
  test('Should create a new location', () => {
    const locationInput = {
      id: 1,
      name: 'Dallas',
      state: 'TX'
    }
    const location = new Location(locationInput)
    expect(location.id).toBe(locationInput.id)
    expect(location.name).toBe(locationInput.name)
    expect(location.state).toBe(locationInput.state)
  })
})