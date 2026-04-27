'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Shield, Search, User, Menu, X, LogOut, LayoutDashboard, Heart, MessageSquare, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Search', href: '/search', icon: Search },
    { label: 'How it Works', href: '/how-it-works', icon: Shield },
  ];

  const dashboardLink = user ? (user.role === 'landlord' ? '/landlord' : '/renter') : null;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
      scrolled ? "bg-white shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
          <span className={cn("text-2xl font-bold font-display", scrolled ? "text-primary" : "text-primary")}>
            Homesure
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-text-primary hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href={dashboardLink!}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="text-text-secondary hover:text-danger p-2 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/login"
                className="text-text-primary hover:text-primary font-medium px-4 py-2"
              >
                Log In
              </Link>
              <Link 
                href="/role"
                className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-border flex flex-col p-4 gap-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="flex items-center gap-3 p-4 text-text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            {user ? (
              <>
                <Link 
                  href={dashboardLink!}
                  className="flex items-center gap-3 p-4 text-primary bg-primary/5 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  <span className="font-bold">Dashboard</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 p-4 text-danger hover:bg-danger/5 rounded-lg text-left"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Log Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link 
                  href="/login"
                  className="p-4 text-center text-text-primary font-medium hover:bg-surface rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href="/role"
                  className="p-4 text-center bg-primary text-white font-bold rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
