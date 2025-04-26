import React, { useState } from 'react';
import { Users, ListFilter, UserPlus, BarChart3, ChevronRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SkillBadge } from '../components/ui/SkillBadge';
import { Job, Skill } from '../types';

// Mock data
const mockEmployer = {
  id: 'employer-1',
  name: 'Sarah Thompson',
  email: 'sarah@techcorp.com',
  role: 'employer' as const,
  createdAt: new Date(),
  companyName: 'TechCorp',
  industry: 'Technology',
  companySize: '51-200',
  location: 'San Francisco, CA',
  description: 'Leading software development company',
  logo: 'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: mockEmployer.companyName,
    location: 'San Francisco, CA',
    description: 'We are looking for a Frontend Developer proficient in React and modern JavaScript.',
    requiredSkills: [
      { id: '1', name: 'JavaScript', level: 'advanced' },
      { id: '2', name: 'React', level: 'intermediate' },
      { id: '4', name: 'HTML', level: 'advanced' },
      { id: '5', name: 'CSS', level: 'advanced' },
    ],
    preferredSkills: [
      { id: '6', name: 'TypeScript', level: 'intermediate' },
      { id: '7', name: 'Redux', level: 'intermediate' },
    ],
    employerId: mockEmployer.id,
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2),
    salaryRange: {
      min: 90000,
      max: 120000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    experienceLevel: 'mid',
  },
  {
    id: 'job-2',
    title: 'DevOps Engineer',
    company: mockEmployer.companyName,
    location: 'Remote',
    description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure.',
    requiredSkills: [
      { id: '10', name: 'AWS', level: 'advanced' },
      { id: '11', name: 'Docker', level: 'intermediate' },
      { id: '12', name: 'Kubernetes', level: 'intermediate' },
      { id: '13', name: 'CI/CD', level: 'intermediate' },
    ],
    employerId: mockEmployer.id,
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 5),
    employmentType: 'full-time',
    experienceLevel: 'mid',
  },
];

// Mock applicants data
const mockApplicants = [
  {
    id: 'applicant-1',
    name: 'John Doe',
    appliedDate: new Date(Date.now() - 86400000 * 1),
    jobId: 'job-1',
    matchPercentage: 85,
    skills: [
      { id: '1', name: 'JavaScript', level: 'advanced' },
      { id: '2', name: 'React', level: 'advanced' },
      { id: '4', name: 'HTML', level: 'advanced' },
      { id: '5', name: 'CSS', level: 'intermediate' },
      { id: '7', name: 'Redux', level: 'intermediate' },
    ],
  },
  {
    id: 'applicant-2',
    name: 'Jane Smith',
    appliedDate: new Date(Date.now() - 86400000 * 2),
    jobId: 'job-1',
    matchPercentage: 75,
    skills: [
      { id: '1', name: 'JavaScript', level: 'intermediate' },
      { id: '2', name: 'React', level: 'intermediate' },
      { id: '4', name: 'HTML', level: 'advanced' },
      { id: '5', name: 'CSS', level: 'advanced' },
      { id: '6', name: 'TypeScript', level: 'beginner' },
    ],
  },
  {
    id: 'applicant-3',
    name: 'Michael Brown',
    appliedDate: new Date(Date.now() - 86400000 * 1),
    jobId: 'job-2',
    matchPercentage: 90,
    skills: [
      { id: '10', name: 'AWS', level: 'advanced' },
      { id: '11', name: 'Docker', level: 'advanced' },
      { id: '12', name: 'Kubernetes', level: 'advanced' },
      { id: '13', name: 'CI/CD', level: 'intermediate' },
      { id: '14', name: 'Terraform', level: 'intermediate' },
    ],
  },
];

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const EmployerDashboard: React.FC = () => {
  const [employer, setEmployer] = useState(() => {
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole') as 'employer' | null;
  return name && role ? { ...mockEmployer, name, email: email || mockEmployer.email, role } : mockEmployer;
});
  const [jobs] = useState(mockJobs);
  const [applicants] = useState(mockApplicants);
  const [selectedJobFilter, setSelectedJobFilter] = useState<string | 'all'>('all');

  const filteredApplicants = selectedJobFilter === 'all'
    ? applicants
    : applicants.filter(applicant => applicant.jobId === selectedJobFilter);

  const totalApplicants = applicants.length;
  const averageMatchRate = Math.round(
    applicants.reduce((sum, applicant) => sum + applicant.matchPercentage, 0) / totalApplicants
  );

  const handleLogout = () => {
  localStorage.clear();
  window.location.href = '/';
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userRole={employer.role} userName={employer.name} onLogout={handleLogout} />
      
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
              <p className="text-gray-600">{employer.companyName}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button icon={UserPlus}>
                Post a New Job
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.length}</div>
                <p className="text-xs text-gray-500">Currently active job postings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalApplicants}</div>
                <p className="text-xs text-gray-500">Across all positions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Match Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageMatchRate}%</div>
                <p className="text-xs text-gray-500">Skill match percentage</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Time to Fill</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 days</div>
                <p className="text-xs text-gray-500">Average hiring time</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Active Job Postings</CardTitle>
                    <Button variant="outline" size="sm">
                      Manage All Jobs
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{job.location}</span>
                            <span className="mx-2">•</span>
                            <span>Posted {formatDate(job.createdAt)}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {job.requiredSkills.slice(0, 3).map((skill) => (
                              <SkillBadge key={skill.id} skill={skill} size="sm" />
                            ))}
                            {job.requiredSkills.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                +{job.requiredSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-center">
                            <span className="block font-medium text-blue-600">
                              {applicants.filter(a => a.jobId === job.id).length}
                            </span>
                            <span className="text-gray-500">applicants</span>
                          </div>
                          <Button variant="ghost" size="sm" className="p-1">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Applications Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full">
                        <div className="relative">
                          <select
                            className="w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={selectedJobFilter}
                            onChange={(e) => setSelectedJobFilter(e.target.value)}
                          >
                            <option value="all">All Jobs</option>
                            {jobs.map((job) => (
                              <option key={job.id} value={job.id}>
                                {job.title}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ListFilter className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((applicant) => {
                          const job = jobs.find(j => j.applicantstions?.includes(applicant.id));
                          return (
                            <div
                              key={applicant.id}
                              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{applicant.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    Applied {formatDate(applicant.appliedDate)}
                                  </p>
                                </div>
                                <div className="relative w-10 h-10">
                                  <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke="#eee"
                                      strokeWidth="3"
                                    />
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke={applicant.matchPercentage > 75 ? '#10B981' : applicant.matchPercentage > 50 ? '#F59E0B' : '#EF4444'}
                                      strokeWidth="3"
                                      strokeDasharray={`${applicant.matchPercentage}, 100`}
                                      strokeLinecap="round"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-xs font-bold">{applicant.matchPercentage}%</span>
                                    </div>
                                  </svg>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Matching skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {applicant.skills.slice(0, 3).map((skill) => (
                                    <SkillBadge key={skill.id} skill={skill} size="sm" />
                                  ))}
                                  {applicant.skills.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      +{applicant.skills.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 text-right">
                                <Button size="sm" variant="outline">
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-6">
                          <Users className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            No applications found for the selected job.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {filteredApplicants.length > 0 && (
                      <div className="text-center">
                        <Button variant="ghost" size="sm">
                          View All Applicants
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; 2025 SkillMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EmployerDashboard;