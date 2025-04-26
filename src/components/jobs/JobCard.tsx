import React from 'react';
import { MapPin, Briefcase as BriefcaseBusiness, Clock } from 'lucide-react';
import { Job } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { SkillBadge } from '../ui/SkillBadge';

interface JobCardProps {
  job: Job;
  matchPercentage?: number;
  matchedSkills?: string[];
  onApply?: () => void;
}

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString();
};

const formatSalary = (min?: number, max?: number, currency: string = 'USD'): string => {
  if (!min && !max) return 'Not specified';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
  
  if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
  if (min) return `From ${formatter.format(min)}`;
  if (max) return `Up to ${formatter.format(max)}`;
  
  return 'Not specified';
};

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  matchPercentage, 
  matchedSkills = [],
  onApply 
}) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-sm font-medium text-gray-700 mb-1">{job.company}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
              <span>{job.location}</span>
              {job.employmentType && (
                <>
                  <span className="mx-2">•</span>
                  <BriefcaseBusiness className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                </>
              )}
            </div>
          </div>
          
          {matchPercentage !== undefined && (
            <div className="ml-4 flex-shrink-0">
              <div className="relative w-16 h-16">
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
                    stroke={matchPercentage > 75 ? '#10B981' : matchPercentage > 50 ? '#F59E0B' : '#EF4444'}
                    strokeWidth="3"
                    strokeDasharray={`${matchPercentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{matchPercentage}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {job.salaryRange && (
          <p className="text-sm text-gray-700 mb-3">
            {formatSalary(job.salaryRange.min, job.salaryRange.max, job.salaryRange.currency)}
          </p>
        )}
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  skill={skill}
                  className={matchedSkills.includes(skill.id) ? 'ring-2 ring-green-300' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>Posted {formatDate(job.createdAt)}</span>
        </div>
        
        <Button onClick={onApply} size="sm">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};