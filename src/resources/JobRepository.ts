import { UUID } from 'crypto';
import { FileSystemDAO } from '.';
import { Job } from "../domain";

export interface JobRepository {
  findById: (id: UUID) => Job | undefined
  create: (job: Job) => void
}

export class JobJSONRepository implements JobRepository {
  fileSystem = new FileSystemDAO<Job>('src/data/jobs.json')
  jobs: Job[] = this.fileSystem.load();

  constructor() { }

  findById(id: UUID): Job | undefined {
    return this.jobs.find(job => job.id === id);
  }

  create(job: Job): void {
    this.jobs.push(job);
    this.fileSystem.save(this.jobs);
  }
}

export class JobMemoryRepository implements JobRepository {
  jobs: Job[] = []

  constructor() { }

  findById(id: UUID): Job | undefined {
    return this.jobs.find(job => job.id === id);
  }

  create(job: Job): void {
    this.jobs.push(job);
  }
}