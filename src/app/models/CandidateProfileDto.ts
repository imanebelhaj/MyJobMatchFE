export interface CandidateProfileDto {
  fullName: string;
  username: string;
  email: string;
  profilePictureUrl: File; //Blob
  phone: string;
  linkedinUrl: string;
  category: string;
  resumePdf: string;
  resumeForm: string;


   summary: string;
   skills: string[];
   languages: string[];


  //experiences
  //education
}
