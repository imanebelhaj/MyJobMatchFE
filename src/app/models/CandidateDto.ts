export interface CandidateDto {
  fullName: string;
  username: string;
  email: string;
  profilePictureUrl: File; //Blob
  phone: string;
  linkedinUrl: string;
  category: string;
  summary: string;
  skills: string[];
  languages: string[];
  resumePdf: File;

  //experiences
  //education
}
