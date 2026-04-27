'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();
  const { toast } = useToast();
  
  const role = searchParams.get('role') || 'renter';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+234',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.name.length < 3) throw new Error("Name must be at least 3 characters");
      if (!formData.email.includes('@')) throw new Error("Invalid email address");
      if (formData.password.length < 6) throw new Error("Password must be at least 6 characters");

      await signup({
        ...formData,
        role: role as any,
      });

      toast("Account created successfully!", "success");
      router.push('/kyc');
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row">
      {/* Left side - Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-white/5 -skew-x-12 translate-x-1/2" />
        
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-primary" size={32} />
          </div>
          <span className="text-2xl font-black tracking-tight">Homesure</span>
        </Link>

        <div className="relative z-10">
          <h1 className="text-6xl font-black leading-tight mb-8">
            Start Your <br /> 
            <span className="italic text-accent">Safe Journey</span> today.
          </h1>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">One Proposal → 7 Platforms</h3>
                <p className="text-white/70">Connect with everyone everywhere instantly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Verified Community</h3>
                <p className="text-white/70">Interact only with real, pre-screened users.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">30-Second Setup</h3>
                <p className="text-white/70">No long forms. Start browsing in seconds.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/50 text-sm">
          <span>TRUSTED BY 50k+ NIGERIANS</span>
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-gray-400 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-black mb-2">Create Account</h2>
            <p className="text-text-secondary">Joining Homesure as a <span className="text-primary font-bold capitalize">{role}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="input-field pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com"
                  className="input-field pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="tel" 
                  required
                  placeholder="+234"
                  className="input-field pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="input-field px-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
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
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-8 text-center text-text-secondary">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>

          <p className="mt-10 text-[10px] text-center text-text-secondary uppercase tracking-[0.2em] font-medium leading-relaxed">
            By creating an account, you agree to Homesure&apos;s <br />
            <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
