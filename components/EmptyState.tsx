'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className 
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-[40px] p-20 text-center flex flex-col items-center gap-6 shadow-sm border border-gray-50", className)}
    >
      <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-text-secondary mb-2">
        <Icon size={48} />
      </div>
      <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
      <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">{description}</p>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="btn-primary px-10 py-4 mt-4"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
