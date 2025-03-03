import {JobDto} from './JobDto';
import {CandidateDto} from './CandidateDto';
import {CandidateProfileDto} from './CandidateProfileDto';

export interface ApplicationDto {
  candidateId: number;
  jobId: string;
  email: string;
  status: string;
  applicationDate: string;
  jobDto : JobDto;
  candidateProfileDto : CandidateProfileDto;
}
