'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-text-primary text-white pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold">Homesure</span>
          </Link>
          <p className="text-white/70 leading-relaxed">
            Every listing verified. Every payment protected. Homesure is Nigeria&apos;s leading platform for secure property transactions.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter size={20} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-white/70">
            <li><Link href="/search" className="hover:text-primary transition-colors">Search Properties</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
            <li><Link href="/role" className="hover:text-primary transition-colors">List Your Property</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold">Locations</h4>
          <ul className="flex flex-col gap-4 text-white/70">
            <li><Link href="/guide/lagos" className="hover:text-primary transition-colors">Lagos</Link></li>
            <li><Link href="/guide/abuja" className="hover:text-primary transition-colors">Abuja</Link></li>
            <li><Link href="/guide/port-harcourt" className="hover:text-primary transition-colors">Port Harcourt</Link></li>
            <li><Link href="/guide/ibadan" className="hover:text-primary transition-colors">Ibadan</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-white/70">
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" />
              <span>15 VI, Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-primary" />
              <span>+234 800 HOMESURE</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-primary" />
              <span>support@homesure.ng</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/50 text-sm">
        <p>© 2026 Homesure Nigeria Ltd. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
