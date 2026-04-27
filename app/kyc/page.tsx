'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Shield, Camera, Upload, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function KYCPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setStep(step + 1);
      }, 1500);
    } else {
      updateUser({ kycStatus: 'verified', verified: true });
      toast("Identity verified successfully!", "success");
      if (user?.role === 'landlord') {
        router.push('/landlord');
      } else {
        router.push('/renter');
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-12 relative px-2">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          {[1,2,3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step >= s ? "bg-primary text-white scale-110 shadow-lg" : "bg-white text-text-secondary border-2 border-gray-200"
              )}
            >
              {step > s ? <CheckCircle size={20} /> : s}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16"
              >
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                    <UserCheck size={40} />
                  </div>
                  <h1 className="text-3xl font-black mb-4">Identity Verification</h1>
                  <p className="text-text-secondary leading-relaxed">
                    To keep Homesure safe for everyone, we need to verify your identity. This only takes 2 minutes.
                  </p>
                </div>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-surface">
                    <CheckCircle className="text-primary" size={20} />
                    <span className="font-medium">NIN or International Passport</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-surface">
                    <CheckCircle className="text-primary" size={20} />
                    <span className="font-medium">Facial Selfie Scan</span>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="btn-primary w-full py-4 text-lg"
                >
                  Start Verification
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 text-center"
              >
                <h2 className="text-3xl font-black mb-4">Upload Document</h2>
                <p className="text-text-secondary mb-10">Upload a clear photo of your NIN slip or National ID.</p>
                
                <div className="border-4 border-dashed border-gray-200 rounded-3xl aspect-video flex flex-col items-center justify-center p-8 mb-10 group hover:border-primary transition-colors cursor-pointer bg-surface/50">
                  <div className="w-20 h-20 bg-white shadow-xl rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="font-bold text-lg mb-2">Click to Upload</p>
                  <p className="text-sm text-text-secondary">PNG, JPG or PDF. Max 5MB</p>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={isUploading}
                  className="btn-primary w-full py-4"
                >
                  {isUploading ? "Verifying Document..." : "Continue"}
                  {!isUploading && <ArrowRight size={20} />}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 text-center"
              >
                <h2 className="text-3xl font-black mb-4">Liveness Check</h2>
                <p className="text-text-secondary mb-10">Look directly into your camera and follow the instructions.</p>
                
                <div className="w-64 h-64 mx-auto rounded-full border-8 border-primary/20 bg-surface relative overflow-hidden mb-10 group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={64} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-pulse" />
                </div>

                <div className="bg-surface p-4 rounded-xl mb-10 inline-flex items-center gap-3">
                  <Shield className="text-primary" size={24} />
                  <span className="font-medium">Data is encrypted and secure</span>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={isUploading}
                  className="btn-primary w-full py-4"
                >
                  {isUploading ? "Confirming Bio-data..." : "Complete Verification"}
                  {!isUploading && <CheckCircle size={20} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-text-secondary text-sm">
          Having trouble? <Link href="#" className="text-primary font-bold">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}
