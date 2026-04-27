'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { PropertyCard } from '@/components/PropertyCard';
import { storage } from '@/lib/storage';
import { Property } from '@/lib/types';
import { MapPin, Search, ChevronRight, ShieldCheck, CreditCard, Key, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    storage.init();
    const props = storage.getProperties();
    setFeaturedProperties(props.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface -z-10 translate-x-1/4 -skew-x-12 hidden lg:block" />
        
        <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
              <ShieldCheck size={18} />
              NIGERIA&apos;S MOST TRUSTED PROPERTY PLATFORM
            </div>
            
            <h1 className="heading-1">
              Find Your <span className="text-primary italic">Perfect Home</span> Without the Stress.
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed">
              Every listing is physically verified. Every payment is held in secure escrow. No more fake agents, no more lost deposits.
            </p>

            <div className="bg-white p-2 rounded-xl shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <Search className="text-primary" size={24} />
                <input 
                  type="text" 
                  placeholder="Where do you want to live?" 
                  className="w-full outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link 
                href={`/search?q=${searchQuery}`}
                className="btn-primary"
              >
                Search Properties
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">1,200+</span>
                <span className="text-sm text-text-secondary font-medium">Verified Listings</span>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">500+</span>
                <span className="text-sm text-text-secondary font-medium">Trusted Landlords</span>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">₦2.5B+</span>
                <span className="text-sm text-text-secondary font-medium">Secure Transactions</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <img 
              src="https://picsum.photos/seed/homehero/1200/1600" 
              alt="Homesure Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Homesure Verified</h4>
                    <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Physical Inspection Certificate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-secondary">Listing ID</p>
                  <p className="font-bold">HS-9921</p>
                </div>
              </div>
              <p className="text-sm text-text-primary italic font-medium">
                &ldquo;We physically visit every property listed here to ensure what you see is exactly what you get.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="bg-surface py-24">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2">Why Property Seekers Trust Homesure</h2>
            <p className="text-text-secondary text-lg">We&apos;re rebuilding trust in the Nigerian real estate market, one transaction at a time.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center flex flex-col items-center gap-6 p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold">100% Verified Listings</h3>
              <p className="text-text-secondary">Every single property is inspected by our team or trusted certifiers before going live.</p>
            </div>
            <div className="card text-center flex flex-col items-center gap-6 p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-bold">Escrow Protection</h3>
              <p className="text-text-secondary">Your money stays in our secure vault until you&apos;ve signed the lease and moved in.</p>
            </div>
            <div className="card text-center flex flex-col items-center gap-6 p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Key size={32} />
              </div>
              <h3 className="text-xl font-bold">Direct Access</h3>
              <p className="text-text-secondary">Message landlords and agents directly. No hidden middle-men or &apos;show money&apos; fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-2">Featured Verified Properties</h2>
              <p className="text-text-secondary text-lg">Hand-picked premium listings that have passed our strictest verification tests.</p>
            </div>
            <Link href="/search" className="btn-outline group">
              View All Properties
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
            
            <Link href="/search" className="bg-surface rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 group p-8 min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Search size={24} />
              </div>
              <span className="font-bold text-center">Looking for something specific?</span>
              <span className="text-sm text-text-secondary text-center">Explore over 1,200 available properties in Lagos, Abuja, and more.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="bg-text-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -ml-48 -mb-48" />
        
        <div className="section-container relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore Neighborhoods</h2>
            <p className="text-white/70 max-w-2xl text-lg">Detailed neighborhood guides to help you find the best location for your lifestyle and budget.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Lagos', count: 850, image: 'https://picsum.photos/seed/lagos/400/500', slug: 'lagos' },
              { name: 'Abuja', count: 320, image: 'https://picsum.photos/seed/abuja/400/500', slug: 'abuja' },
              { name: 'Port Harcourt', count: 180, image: 'https://picsum.photos/seed/ph/400/500', slug: 'port-harcourt' },
              { name: 'Ibadan', count: 120, image: 'https://picsum.photos/seed/ibadan/400/500', slug: 'ibadan' },
            ].map((city) => (
              <Link key={city.slug} href={`/guide/${city.slug}`} className="group relative h-96 rounded-xl overflow-hidden">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                  <p className="text-white/70 font-medium">{city.count} Listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="bg-primary rounded-3xl p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
            
            <div className="max-w-2xl relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to find your next home?</h2>
              <p className="text-white/80 text-xl leading-relaxed mb-10">
                Join thousands of Nigerians who have found their perfect properties safely through Homesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/role" className="btn-accent px-10">
                  Start Your Journey
                </Link>
                <Link href="/how-it-works" className="px-10 py-3 rounded-lg border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  Learn How We Protect You
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative group">
              <div className="absolute inset-0 bg-accent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white text-text-primary p-8 rounded-2xl shadow-2xl border border-white/20 w-80">
                <ShieldCheck size={48} className="text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">Homesure Guarantee</h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  We guarantee the authenticity of every verified listing. If your move-in doesn&apos;t match the listing, we&apos;ll refund your deposit immediately.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                  <span className="font-bold text-sm">Verified Since 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
