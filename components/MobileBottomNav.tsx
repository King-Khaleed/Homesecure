'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, Heart, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Saved', href: '/renter/saved', icon: Heart },
    { 
      label: 'Profile', 
      href: user ? (user.role === 'landlord' ? '/landlord' : '/renter') : '/login', 
      icon: User 
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-3 flex items-center justify-between z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              isActive ? "text-primary scale-110" : "text-text-secondary"
            )}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
