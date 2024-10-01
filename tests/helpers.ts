export const getJobMockData = () => ({
  name: 'Job 1',
  locationId: 1,
  serviceCategoryId: 2
})

export const getVendorsMockData = () => ([
  {
    name: 'Vendor 1',
    locationId: 1,
    serviceCategories: [
      {
        id: 4,
        compliant: false
      },
      {
        id: 2,
        compliant: false
      }
    ]
  },
  {
    name: 'Vendor 2',
    locationId: 1,
    serviceCategories: [{
      id: 2,
      compliant: false
    }]
  },
  {
    name: 'Vendor 3',
    locationId: 1,
    serviceCategories: [{
      id: 2,
      compliant: true
    }]
  },
  {
    name: 'Vendor 4',
    locationId: 1,
    serviceCategories: [{
      id: 1,
      compliant: true
    }]
  },
  {
    name: 'Vendor 5',
    locationId: 10,
    serviceCategories: [{
      id: 2,
      compliant: true
    }]
  }
])