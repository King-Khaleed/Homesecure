'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { storage } from '@/lib/storage';
import { Property, Booking, Application, Transaction } from '@/lib/types';
import { formatNaira, cn } from '@/lib/utils';
import { 
  MapPin, Bed, Bath, User, ShieldCheck, CheckCircle, 
  Heart, Share2, Calendar, MessageSquare, ChevronLeft, 
  ChevronRight, ArrowRight, Home, Info, Ruler, Wind, 
  Car, Lock, Play, Download, Copy, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function PropertyDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSaved, setIsSaved] = useState(false);
  
  // Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    storage.init();
    const prop = storage.getProperty(params.id as string);
    if (prop) {
      setProperty(prop);
      // Increment views
      prop.views += 1;
      storage.saveProperty(prop);
    }
  }, [params.id]);

  useEffect(() => {
    if (user && property) {
      setIsSaved(user.savedProperties.includes(property.id));
    }
  }, [user, property]);

  if (!property) return null;

  const toggleSave = () => {
    if (!user) {
      toast("Please login to save properties", "info");
      router.push('/login');
      return;
    }
    const newSaved = isSaved 
      ? user.savedProperties.filter(id => id !== property.id)
      : [...user.savedProperties, property.id];
    
    updateUser({ savedProperties: newSaved });
    setIsSaved(!isSaved);
    toast(isSaved ? "Property removed from saved" : "Property saved!", "success");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const booking: Booking = {
      id: `book_${Date.now()}`,
      propertyId: property.id,
      renterId: user.id,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      type: formData.get('type') as any,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    storage.saveBooking(booking);
    setShowBookingModal(false);
    toast("Viewing scheduled successfully!", "success");
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    
    const application: Application = {
      id: `app_${Date.now()}`,
      propertyId: property.id,
      renterId: user.id,
      status: 'pending',
      data: {},
      createdAt: new Date().toISOString()
    };
    
    storage.saveApplication(application);
    setShowApplicationModal(false);
    toast("Application submitted successfully!", "success");
  };

  const tabs = ['Overview', 'Amenities', 'Location', 'Reviews', 'Documents'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="lg:hidden relative aspect-[4/3] pt-16">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImage}
            src={property.images[currentImage]} 
            alt={property.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 bg-black/20 backdrop-blur-md rounded-full">
          {property.images.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentImage(i)}
              className={cn(
                "w-2 h-2 rounded-full cursor-pointer transition-all",
                currentImage === i ? "bg-white w-4" : "bg-white/50"
              )} 
            />
          ))}
        </div>
      </div>
      <section className="hidden lg:block pt-32 pb-10 bg-surface">
        <div className="section-container flex items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary px-3 py-1 rounded text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} /> Homesure Verified
              </div>
              <div className="bg-accent px-3 py-1 rounded text-white text-[10px] font-black uppercase tracking-widest">
                For {property.listingType}
              </div>
            </div>
            <h1 className="text-4xl font-black text-text-primary mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin size={20} className="text-primary" />
              <span className="text-lg">{property.location.address}, {property.location.city}, {property.location.state}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-primary mb-1">{formatNaira(property.price)}</div>
            <p className="text-text-secondary uppercase text-xs font-black tracking-widest">Available per {property.pricePeriod}</p>
          </div>
        </div>
      </section>
      <div className="section-container lg:py-10 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-12">
          <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-4 h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="col-span-2 row-span-2 relative group">
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            {property.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative group overflow-hidden">
                <img src={img || `https://picsum.photos/seed/p${i}/600/400`} alt={`${property.title} ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {i === 2 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl cursor-pointer">
                    +{property.images.length - 3} Photos
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Bed, label: 'Bedrooms', val: property.details.bedrooms },
              { icon: Bath, label: 'Bathrooms', val: property.details.bathrooms },
              { icon: User, label: 'Toilets', val: property.details.toilets },
              { icon: Car, label: 'Parking', val: property.details.parking },
            ].map((spec, i) => (
              <div key={i} className="bg-surface p-6 rounded-2xl border border-gray-100 flex flex-col gap-2">
                <spec.icon className="text-primary" size={24} />
                <span className="text-2xl font-black text-text-primary">{spec.val}</span>
                <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{spec.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide gap-8">
              {tabs.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-black uppercase tracking-widest transition-all relative",
                    activeTab === tab ? "text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <div className="min-h-[300px]">
              {activeTab === 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">About this Property</h3>
                    <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-line">{property.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2"><Info size={18} className="text-primary" /> Key Details</h4>
                      <ul className="space-y-3">
                        <li className="flex justify-between text-sm py-2 border-b border-gray-50"><span className="text-text-secondary">Property Type</span><span className="font-bold capitalize">{property.type}</span></li>
                        <li className="flex justify-between text-sm py-2 border-b border-gray-50"><span className="text-text-secondary">Year Built</span><span className="font-bold">{property.details.yearBuilt}</span></li>
                        <li className="flex justify-between text-sm py-2 border-b border-gray-50"><span className="text-text-secondary">Furnishing</span><span className="font-bold capitalize">{property.details.furnishing}</span></li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'Amenities' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-surface/30">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm"><CheckCircle size={20} /></div>
                      <span className="font-bold">{amenity}</span>
                    </div>
                  ))}
                </motion.div>
              )}
              {activeTab === 'Location' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="h-[400px] bg-surface rounded-3xl overflow-hidden border border-gray-100 relative group">
                    <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center text-text-secondary gap-4">
                      <MapPin size={48} className="text-primary animate-bounce" />
                      <span className="font-bold text-center px-10">Map View Available in Full App Integration</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-xl flex items-center justify-between">
                      <div><p className="text-xs font-black uppercase text-text-secondary tracking-widest mb-1">Exact Address</p><p className="font-bold">{property.location.address}</p></div>
                      <button className="btn-primary py-2 px-4 text-xs">Open in Maps</button>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'Documents' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg border border-primary/10"><ShieldCheck size={32} /></div>
                    <div className="flex-1"><h4 className="text-xl font-bold mb-1">Homesure Verified Title</h4><p className="text-text-secondary">This property has a verified C of O and Survey Plan.</p></div>
                  </div>
                  <div className="grid gap-4">
                    {['Land Title Document', 'Property Survey Plan', 'C of O Verification'].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-surface rounded-2xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4"><Lock className="text-text-secondary group-hover:text-primary transition-colors" size={24} /><span className="font-bold">{doc}</span></div>
                        <Download size={20} className="text-text-secondary group-hover:text-primary" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <aside className="lg:w-[400px] space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 sticky top-32">
            <div className="md:hidden pb-6 border-b border-gray-100 mb-6">
              <h1 className="text-2xl font-black mb-2">{property.title}</h1>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-primary">{formatNaira(property.price)}</span>
                <span className="text-xs font-black uppercase text-text-secondary tracking-widest">{property.pricePeriod}</span>
              </div>
            </div>
            <div className="space-y-4">
              <button onClick={() => setShowApplicationModal(true)} className="btn-primary w-full py-5 text-xl relative group overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">Apply to {property.listingType === 'rent' ? 'Rent' : 'Buy'} Now <ArrowRight size={24} /></span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
              <button onClick={() => setShowBookingModal(true)} className="w-full py-4 rounded-xl border-2 border-primary text-primary font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                <Calendar size={20} /> Schedule Physical Viewing
              </button>
              <button className="w-full py-4 rounded-xl bg-surface border border-gray-100 font-bold text-text-primary flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                <MessageSquare size={20} /> Message Landlord
              </button>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
              <button onClick={toggleSave} className={cn("flex items-center gap-2 font-bold transition-all", isSaved ? "text-danger" : "text-text-secondary hover:text-text-primary")}>
                <Heart size={20} fill={isSaved ? "currentColor" : "none"} /> {isSaved ? "Saved" : "Save List"}
              </button>
              <button className="flex items-center gap-2 font-bold text-text-secondary hover:text-text-primary transition-all"><Share2 size={20} /> Share</button>
            </div>
            <div className="mt-8 p-4 bg-surface rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Musa" alt="owner" /></div>
              <div><p className="text-xs uppercase font-black text-text-secondary tracking-widest">Listed By</p><p className="font-black text-text-primary">Alhaji Musa Ibrahim</p><span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Verified Owner</span></div>
              <button className="ml-auto text-primary hover:scale-110 transition-transform"><ChevronRight size={24} /></button>
            </div>
          </div>
          <div className="bg-text-primary text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rotate-45 translate-x-12 -translate-y-12" />
            <ShieldCheck size={40} className="text-primary mb-4" />
            <h4 className="text-lg font-black mb-2">Homesure Guaranteed</h4>
            <p className="text-white/60 text-sm leading-relaxed">Every detail verified. Secure escrow protection for all payments.</p>
          </div>
        </aside>
      </div>
      <Footer />
      <MobileBottomNav />

      {/* Modals */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBookingModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-3xl shadow-2xl relative w-full max-w-lg overflow-hidden">
              <div className="bg-primary p-8 text-white"><div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-black">Schedule Viewing</h3><button onClick={() => setShowBookingModal(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button></div><p className="text-white/70">Choose a convenient time.</p></div>
              <form onSubmit={handleBookingSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-text-secondary">Date</label><input type="date" name="date" required className="input-field" min={new Date().toISOString().split('T')[0]} /></div><div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-text-secondary">Time</label><select name="time" required className="input-field"><option value="09:00">09:00 AM</option><option value="11:00">11:00 AM</option><option value="13:00">01:00 PM</option></select></div></div>
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-text-secondary">Type</label><div className="flex gap-4">{['Physical', 'Virtual'].map(m => (<label key={m} className="flex-1 flex items-center justify-center gap-2 p-4 border border-gray-100 rounded-xl cursor-pointer hover:border-primary transition-all has-[:checked]:bg-primary/5 has-[:checked]:border-primary"><input type="radio" name="type" value={m.toLowerCase()} defaultChecked={m === 'Physical'} className="hidden" /><span className="font-bold">{m}</span></label>))}</div></div>
                <button type="submit" className="btn-primary w-full py-4 text-lg">Confirm Booking <CheckCircle size={20} /></button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showApplicationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowApplicationModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-3xl shadow-2xl relative w-full max-w-lg overflow-hidden">
              <div className="bg-accent p-8 text-white"><div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-black">Quick Application</h3><button onClick={() => setShowApplicationModal(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button></div><p className="text-white/70">Express your interest.</p></div>
              <div className="p-8 space-y-8">
                <div className="p-6 bg-surface rounded-2xl border border-gray-100"><div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary border-2 border-primary"><CheckCircle size={24} /></div><div><h4 className="font-black text-text-primary">Verified Profile</h4><p className="text-xs text-text-secondary">Identity Attached</p></div></div><p className="text-sm text-text-secondary">Your profile is pre-cleared for this property.</p></div>
                <button onClick={handleApplicationSubmit} className="btn-primary w-full py-4 text-lg">Submit Application <ArrowRight size={20} /></button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
