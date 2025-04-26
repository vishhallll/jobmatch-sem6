export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobSeeker' | 'employer';
  createdAt: Date;
}

export interface JobSeeker extends User {
  role: 'jobSeeker';
  skills: Skill[];
  bio?: string;
  experience?: Experience[];
  education?: Education[];
  location?: string;
  profileImage?: string;
}

export interface Employer extends User {
  role: 'employer';
  companyName: string;
  industry?: string;
  companySize?: string;
  location?: string;
  description?: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: Skill[];
  preferredSkills?: Skill[];
  employerId: string;
  createdAt: Date;
  updatedAt: Date;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

export interface JobMatch {
  job: Job;
  matchPercentage: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
}