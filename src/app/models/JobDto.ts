export interface JobDto {
  id: number;
  title: string;
  category: string;
  location: string;
  maxApplications: number;
  status: string;
  description?: string;
  createdAt?: string;
  jobType?: string;
  salaryRange?: string;
}
