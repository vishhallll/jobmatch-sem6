import axios from 'axios';
import { UserRole } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  name: string;
  role: string;
}

export const userService = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/api/auth/login', credentials),

  register: (userData: RegisterData) =>
    api.post<AuthResponse>('/api/auth/register', userData),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const jobService = {
  getJobs: () => api.get('/api/jobs'),
  getJob: (id: string) => api.get(`/api/jobs/${id}`),
  createJob: (jobData: any) => api.post('/api/jobs', jobData),
  updateJob: (id: string, jobData: any) => api.put(`/api/jobs/${id}`, jobData),
};

export const skillService = {
  getSkills: () => api.get('/api/skills'),
  addSkill: (skillData: { name: string; category: string }) =>
    api.post('/api/skills', skillData),
};

// Add an interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
