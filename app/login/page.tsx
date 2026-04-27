'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email);
      if (success) {
        toast("Welcome back!", "success");
        // Redirect logic based on role
        const currentUser = JSON.parse(localStorage.getItem('homesure_currentUser') || '{}');
        if (currentUser.role === 'landlord') {
          router.push('/landlord');
        } else {
          router.push('/renter');
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[600px]">
        {/* Left side - Branding */}
        <div className="bg-primary md:w-2/5 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-white/5 -skew-x-12 translate-x-1/2" />
          
          <Link href="/" className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-primary" size={24} />
            </div>
            <span className="text-xl font-black">Homesure</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-4xl font-black leading-tight mb-6">Welcome Back Champion</h2>
            <p className="text-white/70 leading-relaxed">
              Log in to access your verified dashboard and manage your properties safely.
            </p>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-2 opacity-50 text-xs font-black uppercase tracking-widest">
              <Lock size={12} />
              Secure Login System
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 p-12 md:p-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-12">
              <h1 className="text-3xl font-black mb-2">Sign In</h1>
              <p className="text-text-secondary">Enter your details to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="chidi@email.com"
                    className="input-field pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Password</label>
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    className="input-field px-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full py-4 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-10 border-t border-gray-100 text-center">
              <p className="text-text-secondary font-medium">
                New to Homesure? <Link href="/role" className="text-primary font-black hover:underline">Create an Account</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
