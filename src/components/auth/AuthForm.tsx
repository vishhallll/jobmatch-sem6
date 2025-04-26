import React, { useState } from 'react';
import { User, Building2, Mail, Lock } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { userService } from '../../services/api';
import { AuthMode, UserRole, AuthResponse } from '../../types/auth';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('jobSeeker');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const name = formData.get('name') as string;

      if (!email || !password) {
        console.error('Email and password are required');
        return;
      }
      if (mode === 'register' && !name) {
        console.error('Name is required for registration');
        return;
      }

      const response = await (
        mode === 'login'
          ? userService.login({ email, password })
          : userService.register({ email, password, name, role })
      );

      const { token, name: userName, role: userRole } = response.data as AuthResponse;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userRole', userRole);

      // Redirect based on role (use userRole from API response)
      const redirectPath = userRole === 'jobSeeker' ? '/jobseeker' : '/employer';
      window.location.href = redirectPath;
    } catch (error) {
      console.error('Authentication error:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <Input
                name="name"
                type="text"
                placeholder="Full Name"
                icon={User}
                required
                autoComplete="name"
              />
            </div>
          )}
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              icon={Mail}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={role === 'jobSeeker' ? 'primary' : 'outline'}
                  onClick={() => setRole('jobSeeker')}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  Job Seeker
                </Button>
                <Button
                  type="button"
                  variant={role === 'employer' ? 'primary' : 'outline'}
                  onClick={() => setRole('employer')}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Building2 size={16} />
                  Employer
                </Button>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          disabled={isLoading}
        >
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;