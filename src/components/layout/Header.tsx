import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  userRole?: 'jobSeeker' | 'employer';
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userRole,
  userName,
  onLogout,
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SkillMatch</span>
          </div>
          
          <nav className="hidden sm:flex sm:items-center sm:space-x-8">
            {userRole === 'jobSeeker' && (
              <>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Find Jobs
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  My Applications
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Profile
                </a>
              </>
            )}
            
            {userRole === 'employer' && (
              <>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Post a Job
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Candidates
                </a>
              </>
            )}
          </nav>

          <div className="flex items-center">
            {userRole ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">{userName}</span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
                <Button size="sm">
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};