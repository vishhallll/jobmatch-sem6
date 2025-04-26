import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Job } from '../../types';
import { JobCard } from './JobCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface JobListProps {
  jobs: Job[];
  matchPercentages?: Record<string, number>;
  matchedSkills?: Record<string, string[]>;
  isLoading?: boolean;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  matchPercentages,
  matchedSkills,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.requiredSkills.some((skill) => skill.name.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search jobs, skills, or companies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            fullWidth
          />
        </div>
        <Button
          variant="outline"
          icon={SlidersHorizontal}
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
        >
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-sm mb-3">Filter Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter options would go here */}
            <div className="col-span-full">
              <p className="text-sm text-gray-500">Filters will be added here</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              matchPercentage={matchPercentages?.[job.id]}
              matchedSkills={matchedSkills?.[job.id]}
              onApply={() => console.log(`Applied to ${job.title}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any jobs matching your search. Try adjusting your filters or search terms.
          </p>
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};