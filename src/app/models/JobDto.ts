export interface JobDto {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  createdAt: string;
  editedAt?: string;
  applicationDeadline: string;
  postedAt?: string;
  maxApplications: number;
  status: string;
  jobType: string;
  salaryRange: string;
  requiredEducation: string;
  requiredExperience: string;
  jobLevel: string;
  requiredSkills: string[];
}
