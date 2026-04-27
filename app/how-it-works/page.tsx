'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ShieldCheck, ArrowRight, CheckCircle, Search, MapPin, MessageSquare, CreditCard, Lock, Play, Award, Zap, Globe, Heart, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function HowItWorksPage() {
  const steps = [
    { 
      title: 'Find Your Dream Home', 
      desc: 'Browse over 1,200 property listings across Nigeria. Every property you see is physically inspected and verified.', 
      icon: Search,
      color: 'bg-blue-500'
    },
    { 
      title: 'Direct Communication', 
      desc: 'Message verified landlords or agents directly. No hidden fees, no &quot;agent&quot; money before the physical viewing.', 
      icon: MessageSquare,
      color: 'bg-primary'
    },
    { 
      title: 'Secure Escrow Payment', 
      desc: 'Pay through Homesure Pay. Your money stays in our secure vault until you&apos;ve moved in and verified the property.', 
      icon: Lock,
      color: 'bg-accent'
    }
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '₦0',
      description: 'Ideal for basic property searches.',
      features: ['Browse all listings', 'Save up to 5 properties', 'Basic search filters', 'Community support'],
      cta: 'Start for Free',
      recommended: false
    },
    {
      name: 'Builder',
      price: '₦79,000',
      period: '/mo',
      description: 'Perfect for active home seekers.',
      features: ['Unlimited saved properties', '50 priority applications', 'Early access to new listings', 'Direct agent chat', 'Resident Score boost'],
      cta: 'Join Builder Tier',
      recommended: true
    },
    {
      name: 'DAO',
      price: '₦149,000',
      period: '/mo',
      description: 'For corporate & relocations.',
      features: ['Unlimited everything', 'Professional mover service', 'Concierge key delivery', 'Legal document review', '24/7 dedicated manager'],
      cta: 'Get Professional Plan',
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-48 pb-24 bg-surface text-center overflow-hidden">
        <div className="section-container relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-black text-text-primary mb-8 leading-tight">
              Real Estate with <span className="text-primary italic underline decoration-accent decoration-4">Zero Trust</span> Issues.
            </h1>
            <p className="text-2xl text-text-secondary leading-relaxed mb-12">
              Homesure simplifies property rental and purchase in Nigeria by eliminating fraud and middle-man stress at every stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/role" className="btn-primary px-12 py-5 text-xl">Start Your Journey Now</Link>
              <button className="px-12 py-5 rounded-lg bg-white border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                <Play fill="currentColor" size={20} />
                Watch Success Stories
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 3-Step Process */}
      <section className="py-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group p-10 rounded-3xl bg-white border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="absolute -top-6 left-10 w-16 h-16 rounded-2xl bg-text-primary text-white flex items-center justify-center font-black text-2xl z-10">
                   0{i + 1}
                </div>
                <div className={cn("w-20 h-20 rounded-3xl mb-8 flex items-center justify-center text-white scale-110 shadow-lg", step.color)}>
                   <step.icon size={40} />
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed text-lg">{step.desc}</p>
                <div className="mt-10 h-1 bg-gray-100 w-full rounded-full group-hover:bg-primary/20 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Homesure Standard (Differentiators) */}
      <section className="bg-text-primary py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="section-container relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight">We build trust in <br/> <span className="text-accent">every detail.</span></h2>
            <div className="space-y-10">
              {[
                { title: 'Physical Inspection', desc: 'We don&apos;t just verify documents. Our localized field team visits every single house, takes real photos, and checks power/water stability.', icon: MapPin },
                { title: 'Identity & KYC', desc: 'Every renter and landlord is identity-verified via NIN. We eliminate ghost listings and fake profiles from day one.', icon: ShieldCheck },
                { title: 'Escrow Protection', desc: 'Never pay the wrong person again. Your funds are secured until the keys are in your hands and the door locks work.', icon: Lock }
              ].map((item) => (
                <div key={item.title} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:scale-110">
                     <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-accent rounded-full blur-[100px] opacity-20" />
             <div className="relative bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                    <Award size={48} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black">Verified & Protected</h3>
                    <p className="text-white/50 text-sm italic font-medium mt-1">The Gold Standard in Nigerian Real Estate</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <Zap className="text-accent mb-2" />
                      <p className="text-2xl font-black">30 Sec</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Response Time</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <Globe className="text-accent mb-2" />
                      <p className="text-2xl font-black">10+ Cities</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Active Coverage</p>
                   </div>
                </div>
                <div className="mt-10 p-6 bg-primary/20 rounded-2xl border border-primary/20">
                   <p className="text-sm font-medium leading-relaxed italic opacity-80">
                      &ldquo;Homesure saved my family from a major rental scam in Lekki. Their escrow system is a literal lifesaver for anyone moving in Lagos.&rdquo;
                   </p>
                   <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-8 rounded-full bg-gray-600" />
                      <span className="text-xs font-bold font-black uppercase tracking-widest">— Tunde Okeke</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-surface">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="heading-2">Plan Your Success</h2>
            <p className="text-xl text-text-secondary">Choose the tier that fits your property search or portfolio management.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name} 
                className={cn(
                  "bg-white rounded-[40px] p-10 flex flex-col relative transition-all border-4",
                  tier.recommended ? "border-primary shadow-2xl scale-105 z-10" : "border-gray-50 shadow-sm hover:translate-y-[-8px]"
                )}
              >
                {tier.recommended && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest border-4 border-white shadow-xl">
                    Recommended
                  </div>
                )}
                
                <div className="mb-10 text-center">
                  <h3 className="text-2xl font-black mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-5xl font-black text-text-primary">{tier.price}</span>
                    {tier.period && <span className="text-text-secondary font-bold text-lg">{tier.period}</span>}
                  </div>
                  <p className="text-text-secondary font-medium">{tier.description}</p>
                </div>

                <div className="space-y-5 mb-10 flex-1">
                   {tier.features.map((f) => (
                     <div key={f} className="flex items-center gap-3 text-sm font-bold text-text-primary">
                        <CheckCircle size={18} className="text-primary flex-shrink-0" />
                        {f}
                     </div>
                   ))}
                </div>

                <button className={cn(
                  "w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all",
                  tier.recommended ? "bg-primary text-white hover:bg-primary-hover shadow-lg" : "bg-surface text-text-primary hover:bg-gray-200"
                )}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Final CTA */}
      <section className="py-32">
        <div className="section-container">
          <div className="bg-accent rounded-[60px] p-12 lg:p-24 text-white flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] translate-x-1/4" />
            <div className="max-w-2xl relative z-10">
               <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">Still have <br/> questions?</h2>
               <p className="text-2xl text-white/80 leading-relaxed mb-12">
                 Our 24/7 trust advisors are ready to help you navigate your first property transaction safely.
               </p>
               <div className="flex flex-col sm:flex-row gap-6">
                  <button className="px-10 py-5 bg-white text-accent rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                    Chat with an Advisor
                  </button>
                  <Link href="/role" className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    Create Free Account
                  </Link>
               </div>
            </div>

            <div className="hidden lg:flex flex-col gap-6 relative z-10">
               {[
                 { q: 'Is my NIN safe?', a: 'Encrypted with banking-grade security.' },
                 { q: 'Can I get a refund?', a: 'Yes, 100% within 24 hours.' },
                 { q: 'Are listings live?', a: 'Yes, all are real & current.' }
               ].map((faq) => (
                 <div key={faq.q} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl w-80">
                   <h4 className="font-bold mb-1 text-accent text-sm flex items-center gap-2">
                     <Info size={14} />
                     {faq.q}
                   </h4>
                   <p className="text-white font-medium text-sm">{faq.a}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
