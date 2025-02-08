import {JobDto} from './JobDto';

export interface ApplicationDto {
  candidateId: number;
  jobId: string;
  email: string;
  status: string; //Blob
  applicationDate: string;
  jobDto : JobDto;
}
