'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const page: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // In a real app, you would make an API call here
    // For demo purposes, we'll simulate authentication
    console.log('Login attempt with:', { email, password });
    
    // Store auth token/session (in real app, use proper auth)
    localStorage.setItem('admin-authenticated', 'true');
    
    // Redirect to admin dashboard
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#E3E8DE] flex flex-col relative font-sans">
      {/* Logo in top left */}
      <div className="absolute top-10 left-10">
        {/* Add your logo here if needed */}
      </div>

      {/* Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-6 mt-16">
        <div className="bg-white w-full max-w-[440px] rounded-[16px] shadow-xl p-8 md:p-10">
          <h1 className="font-serif text-[32px] text-[#1B2C42] text-center mb-10">
            Login as Admin
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Admin Email */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1B2C42]/80">
                Admin Email
              </label>
              <input 
                type="email" 
                placeholder="Enter admin email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-[8px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1B2C42]/80">
                Password
              </label>
              <input 
                type="password" 
                placeholder="**********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-[8px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1B2C42]/80">
                Confirm Password
              </label>
              <input 
                type="password" 
                placeholder="**********" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-[8px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] h-14 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
              >
                Login <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;