import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserCheck, Building2, BarChart, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import AuthForm from '../components/auth/AuthForm';
import { userService } from '../services/api';

type UserState = {
  name: string;
  role: 'jobSeeker' | 'employer';
} | null;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = React.useState({
    jobSeeker: false,
    employer: false
  });

  const [user, setUser] = React.useState<UserState>(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole') as 'jobSeeker' | 'employer';
    return token && name && role ? { name, role } : null;
  });

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        userRole={user?.role}
        userName={user?.name}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-16 sm:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute bottom-0 left-0 right-0 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">The smarter way to</span>
                  <span className="block text-indigo-200">match skills with jobs</span>
                </h1>
                <p className="mt-3 text-base text-indigo-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  SkillMatch connects job seekers with employers through intelligent skill matching,
                  helping you find the perfect fit faster.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                      size="lg"
                      variant="secondary"
                      icon={UserCheck}
                      iconPosition="right"
                      isLoading={loadingStates.jobSeeker}
                      onClick={async () => {
                        setLoadingStates(prev => ({ ...prev, jobSeeker: true }));
                        try {
                          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
                          navigate('/jobseeker');
                        } finally {
                          setLoadingStates(prev => ({ ...prev, jobSeeker: false }));
                        }
                      }}
                    >
                      Find a Job
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      icon={Building2}
                      iconPosition="right"
                      isLoading={loadingStates.employer}
                      onClick={async () => {
                        setLoadingStates(prev => ({ ...prev, employer: true }));
                        try {
                          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
                          navigate('/employer');
                        } finally {
                          setLoadingStates(prev => ({ ...prev, employer: false }));
                        }
                      }}
                      className="!text-white !border-white hover:!bg-blue-700/20"
                    >
                      Hire Talent
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <div className="p-2">
                      <AuthForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                Streamline your hiring process
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Our intelligent matching system connects the right people with the right opportunities.
              </p>
            </div>

            <div className="mt-16">
              <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="relative">
                  <div className="relative pb-10">
                    <div className="absolute inset-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <UserCheck className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Skill Matching</p>
                  </div>
                  <div className="relative">
                    <p className="text-base text-gray-500">
                      Our AI-powered algorithm matches job seekers with opportunities based on their skills,
                      experience, and career goals.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative pb-10">
                    <div className="absolute inset-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Briefcase className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Job Postings</p>
                  </div>
                  <div className="relative">
                    <p className="text-base text-gray-500">
                      Employers can create detailed job listings with required skills, making it easier to
                      find candidates who match their specific needs.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative pb-10">
                    <div className="absolute inset-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <BarChart className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Skill Analytics</p>
                  </div>
                  <div className="relative">
                    <p className="text-base text-gray-500">
                      Get insights into in-demand skills and market trends to help job seekers focus
                      their learning and employers optimize their hiring strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to find your perfect match?</span>
              <span className="block text-blue-200">Start using SkillMatch today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-50"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Job Seekers</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Career Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Skill Assessment
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Employers</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Post a Job
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 SkillMatch, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;