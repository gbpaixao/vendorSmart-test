# Mini-Rutter

An API to connect Vendors and Jobs.

# Table of Contents
1. [Introduction](#introduction)
2. [Design Choices](#design-choices)
3. [Technology Choices](#technology-choices)
4. [Getting Started](#getting-started)
5. [Usage](#usage)

## Introduction

ℹ️ This project has been developed as part of VendorSmart's application test

The challenge is to find suitable and qualified vendors that offer the requested service to a community considering its location.

## Design Choices

I decided to use some Clean Architecture in order to keep things organized, with separation of concerns and testable. 

- Domain: the domain (Job, Location, ServiceCategory and Vendor) can be found in the `src/domain` folder and it's a model representation of the system. Since the domain is separated, it's easily tested;
- Use Cases: the use cases (CreateJob, CreateVendor, FindVendorsForJob and GetReachableVendors) can be found in the `src/usecases` folder. It's designed like that so they are independent from one another;
- Resources: 
  - Repositories: the repositories can be found in the `src/resources` folder. They mediate between the domain and the data layer. The repository implementations are memory (used for testing) and json (used for storing values on the file system);
  - DAO: the `src/resources/FileDAO.ts` acts like a DAO (data-access object) and interacts with the data layer, which are files on the file system;
- API: the API acts as a driver to the application. It's completely separated and it only implements the endpoints and calls the usecases.

I decided to store the data on the file system in order to quickly testing everything without having to readd everything all the time. This behavior could've been easily changed by just using the "Memory" repository implementation instead of the "JSON" ones. So, keep in mind that all suggested vendors and jobs are **already** added to the system.


## Technology Choices

- Node.js and Typescript - I decided on both technologies because of my expertise on them. That was a decision based on how fast could I deliver this challenge correctly.
- Express - I could've gone with other web frameworks such as NestJS or Fastify, but Express is well accepted and easy to plug in;
- jest - I used jest to test the application (unit and integration tests);
- axios - I used axios to test the API;
- Docker - I used docker to serve the application easily. You just need Docker installed in order to run it.

## Getting Started
After cloning the project, you have two options to run it, using Docker or manually running it.

### Option 1: Fast run
To run the application using Docker:
```
docker-compose up --build
```
That will build an image and run a container using it.

### Option 2: Installation

Install the application using:
```
npm install
```

If everything is right with the installation, you'll be able to run the application:
```
npm run dev
```
You can open `http://localhost:3000/` to see the text "API is running"

### Testing the Application
You can test the application by running:
```
npm test
```
Beware that in order for the API tests to run, you need to run the application first (npm run dev).

## Usage

To use the API, you can make requests on the following routes:

### Create Job (authenticated)
Endpoint: `http://localhost:3000/create-job`

Explanation
```ts
// body
{
  "name": <string>,
  "locationId": <number>,
  "serviceCategoryId": <number>
}  
```

### Create Vendor (authenticated)
Endpoint: `http://localhost:3000/create-vendor`

Explanation
```ts
// body
{
  "name": <string>,
  "locationId": <number>,
  "serviceCategories": [{
    "id": <number>,
    "compliant": <boolean>
  }]
}
```

### Find Reachable Vendors (authenticated)
Endpoint: `http://localhost:3000/find-vendors-for-job?jobId={jobId}`

Explanation


### Find Reachable Vendors 
Endpoint: `http://localhost:3000/get-reachable-vendors?locationId={locationId}&serviceCategoryId={serviceCategoryId}`

Explanation


## Improvements

Write what I would improve here:
I would document the API using Swagger;
I would move the authentication values to environment variables;