export type AuthMode = 'login' | 'register';
export type UserRole = 'jobSeeker' | 'employer';

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  name: string;
  role: UserRole;
}
