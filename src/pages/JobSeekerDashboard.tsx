import React, { useState } from 'react';
import { Briefcase, BookOpen, BarChart3, BellRing } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { JobList } from '../components/jobs/JobList';
import { SkillSelector } from '../components/profile/SkillSelector';
import { Button } from '../components/ui/Button';
import { Job, Skill, JobMatch } from '../types';

// Mock data for demonstration
const mockUser = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'jobSeeker' as const,
  createdAt: new Date(),
  skills: [
    { id: '1', name: 'JavaScript', level: 'advanced' as const },
    { id: '2', name: 'React', level: 'intermediate' as const },
    { id: '3', name: 'Node.js', level: 'intermediate' as const },
  ],
  bio: 'Full-stack developer with 3 years of experience',
  location: 'San Francisco, CA',
};

const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'TechCorp',
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
    employerId: 'employer-1',
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
    title: 'Full Stack Developer',
    company: 'InnovateTech',
    location: 'Remote',
    description: 'Join our team as a Full Stack Developer working with React and Node.js.',
    requiredSkills: [
      { id: '1', name: 'JavaScript', level: 'advanced' },
      { id: '2', name: 'React', level: 'intermediate' },
      { id: '3', name: 'Node.js', level: 'intermediate' },
      { id: '8', name: 'Express', level: 'intermediate' },
    ],
    employerId: 'employer-2',
    createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000 * 1),
    employmentType: 'full-time',
    experienceLevel: 'mid',
  },
  {
    id: 'job-3',
    title: 'Senior React Developer',
    company: 'GrowthStartup',
    location: 'New York, NY',
    description: 'Looking for an experienced React developer to lead our frontend team.',
    requiredSkills: [
      { id: '1', name: 'JavaScript', level: 'expert' },
      { id: '2', name: 'React', level: 'advanced' },
      { id: '7', name: 'Redux', level: 'advanced' },
      { id: '6', name: 'TypeScript', level: 'intermediate' },
    ],
    employerId: 'employer-3',
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 3),
    salaryRange: {
      min: 120000,
      max: 160000,
      currency: 'USD',
    },
    employmentType: 'full-time',
    experienceLevel: 'senior',
  },
];

// Mock job matches calculation
const calculateJobMatches = (jobs: Job[], userSkills: Skill[]): Record<string, number> => {
  const matches: Record<string, number> = {};
  
  jobs.forEach(job => {
    const requiredSkillsCount = job.requiredSkills.length;
    let matchedSkillsCount = 0;
    
    job.requiredSkills.forEach(requiredSkill => {
      const userHasSkill = userSkills.some(userSkill => 
        userSkill.name.toLowerCase() === requiredSkill.name.toLowerCase()
      );
      
      if (userHasSkill) {
        matchedSkillsCount++;
      }
    });
    
    const matchPercentage = Math.round((matchedSkillsCount / requiredSkillsCount) * 100);
    matches[job.id] = matchPercentage;
  });
  
  return matches;
};

// Mock matched skills calculation
const calculateMatchedSkills = (jobs: Job[], userSkills: Skill[]): Record<string, string[]> => {
  const matchedSkills: Record<string, string[]> = {};
  
  jobs.forEach(job => {
    matchedSkills[job.id] = job.requiredSkills
      .filter(requiredSkill => 
        userSkills.some(userSkill => 
          userSkill.name.toLowerCase() === requiredSkill.name.toLowerCase()
        )
      )
      .map(skill => skill.id);
  });
  
  return matchedSkills;
};

// Mock recommended skills based on popular job requirements
const getRecommendedSkills = (jobs: Job[], userSkills: Skill[]): Skill[] => {
  const skillCounts: Record<string, { count: number, skill: Skill }> = {};
  
  // Count skills that appear in job listings but user doesn't have
  jobs.forEach(job => {
    [...job.requiredSkills, ...(job.preferredSkills || [])].forEach(skill => {
      const userHasSkill = userSkills.some(
        userSkill => userSkill.name.toLowerCase() === skill.name.toLowerCase()
      );
      
      if (!userHasSkill) {
        const skillKey = skill.name.toLowerCase();
        if (!skillCounts[skillKey]) {
          skillCounts[skillKey] = { count: 0, skill };
        }
        skillCounts[skillKey].count += 1;
      }
    });
  });
  
  // Sort by frequency and return top skills
  return Object.values(skillCounts)
    .sort((a, b) => b.count - a.count)
    .map(item => item.skill)
    .slice(0, 5);
};

export const JobSeekerDashboard: React.FC = () => {
  const [user, setUser] = useState(() => {
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole') as 'jobSeeker' | null;
  return name && role ? { ...mockUser, name, email: email || mockUser.email, role } : mockUser;
});
  const [matchedJobs, setMatchedJobs] = useState<Job[]>(mockJobs);
  const [isLoading, setIsLoading] = useState(false);
  
  const jobMatches = calculateJobMatches(matchedJobs, user.skills);
  const matchedSkills = calculateMatchedSkills(matchedJobs, user.skills);
  const recommendedSkills = getRecommendedSkills(matchedJobs, user.skills);
  
  // Sort jobs by match percentage
  const sortedJobs = [...matchedJobs].sort(
    (a, b) => (jobMatches[b.id] || 0) - (jobMatches[a.id] || 0)
  );

  const handleSkillsChange = (skills: Skill[]) => {
    setUser({ ...user, skills });
    
    // Simulate API call to refresh job matches
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would fetch new job matches based on updated skills
    }, 1000);
  };

  const handleLogout = () => {
  localStorage.clear();
  window.location.href = '/';
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userRole={user.role} userName={user.name} onLogout={handleLogout} />
      
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name.split(' ')[0]}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                <Briefcase className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sortedJobs.filter(job => jobMatches[job.id] >= 70).length}</div>
                <p className="text-xs text-gray-500">High match rate (70%+)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">My Skills</CardTitle>
                <BookOpen className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.skills.length}</div>
                <p className="text-xs text-gray-500">Skills in your profile</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <BellRing className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-500">New job matches this week</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>My Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <SkillSelector
                    selectedSkills={user.skills}
                    onSkillsChange={handleSkillsChange}
                    suggestedSkills={recommendedSkills}
                  />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Skill Gap Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Based on your target jobs, consider developing these skills:
                    </p>
                    
                    {recommendedSkills.slice(0, 3).map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{skill.name}</p>
                          <p className="text-xs text-gray-500">
                            In {mockJobs.filter(job => 
                              job.requiredSkills.some(s => s.name === skill.name) || 
                              (job.preferredSkills || []).some(s => s.name === skill.name)
                            ).length} job postings
                          </p>
                        </div>
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                      </div>
                    ))}
                    
                    {recommendedSkills.length > 0 && (
                      <Button variant="outline" size="sm" fullWidth>View All Recommendations</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recommended Jobs</CardTitle>
                  <Button size="sm" variant="outline">View All Jobs</Button>
                </CardHeader>
                <CardContent>
                  <JobList
                    jobs={sortedJobs}
                    matchPercentages={jobMatches}
                    matchedSkills={matchedSkills}
                    isLoading={isLoading}
                  />
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

export default JobSeekerDashboard;