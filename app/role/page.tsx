'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Shield, Home, Building2, UserCircle, Briefcase, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoleSelectionPage() {
  const roles = [
    {
      id: 'renter',
      title: 'I want to rent or buy',
      description: 'Find verified apartments, duplexes, or commercial spaces with secure escrow protection.',
      icon: Home,
      color: 'bg-primary',
      link: '/signup?role=renter'
    },
    {
      id: 'landlord',
      title: 'I want to list property',
      description: 'Get your property verified and connect with pre-screened tenants or buyers securely.',
      icon: Building2,
      color: 'bg-accent',
      link: '/signup?role=landlord'
    },
    {
      id: 'agent',
      title: 'I am an Agent / Developer',
      description: 'Register as a certified partner to manage multiple verified listings for your clients.',
      icon: Briefcase,
      color: 'bg-text-primary',
      link: '/signup?role=agent'
    }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 pt-32 pb-20">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-primary font-bold mb-4"
            >
              <Lock size={18} />
              SECURE ONBOARDING
            </motion.div>
            <h1 className="text-4xl font-black mb-4">Choose Your Path</h1>
            <p className="text-text-secondary text-lg">Tell us how you want to use Homesure to get started.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={role.link} className="group block h-full">
                  <div className="bg-white rounded-2xl border-2 border-transparent hover:border-primary p-8 shadow-sm hover:shadow-xl transition-all flex flex-col h-full items-center text-center">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform",
                      role.color
                    )}>
                      <role.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{role.title}</h3>
                    <p className="text-text-secondary leading-relaxed mb-8 flex-1">{role.description}</p>
                    <div className="w-full h-12 bg-surface rounded-lg flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all">
                      Choose
                      <ChevronRight size={20} className="ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center text-text-secondary">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in here</Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-10 border-t border-gray-100 mt-auto text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 text-text-secondary text-sm">
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={20} />
            <span>SECURE KYC VERIFIED</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-primary" size={20} />
            <span>DIRECT PAYMENTS</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle className="text-primary" size={20} />
            <span>VERIFIED IDENTITY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Need cn here too since it's a separate file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
