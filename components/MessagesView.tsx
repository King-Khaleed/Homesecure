'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { storage } from '@/lib/storage';
import { Message, User } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Send, Search, User as UserIcon, MessageSquare, ChevronLeft, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function MessagesView() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      storage.init();
      const allMessages = storage.getMessages().filter(m => m.senderId === user.id || m.receiverId === user.id);
      
      const threads: any = {};
      allMessages.forEach(m => {
        const otherId = m.senderId === user.id ? m.receiverId : m.senderId;
        if (!threads[otherId]) {
          const u = storage.getUsers().find(u => u.id === otherId);
          threads[otherId] = {
            id: otherId,
            user: u,
            lastMessage: m,
          };
        }
      });
      
      if (Object.keys(threads).length === 0) {
        const m = storage.getUsers().find(u => u.role === (user.role === 'landlord' ? 'renter' : 'landlord'));
        if (m) {
          threads[m.id] = { id: m.id, user: m, lastMessage: { content: 'No messages yet', createdAt: new Date().toISOString() } };
        }
      }
      
      setConversations(Object.values(threads));
    }
  }, [user]);

  useEffect(() => {
    if (selectedThread && user) {
      const allMessagesByThread = storage.getMessages().filter(m => 
        (m.senderId === user.id && m.receiverId === selectedThread) || 
        (m.receiverId === user.id && m.senderId === selectedThread)
      );
      setMessages(allMessagesByThread.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      setOtherUser(storage.getUsers().find(u => u.id === selectedThread) || null);
    }
  }, [selectedThread, user]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread || !user) return;

    const msg: Message = {
      id: `msg_${Date.now()}`,
      threadId: selectedThread,
      senderId: user.id,
      receiverId: selectedThread,
      content: newMessage,
      createdAt: new Date().toISOString()
    };

    storage.saveMessage(msg);
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
    
    setTimeout(() => {
      const reply: Message = {
        id: `msg_r_${Date.now()}`,
        threadId: selectedThread,
        senderId: selectedThread,
        receiverId: user.id,
        content: "Thanks for your message! I'll get back to you soon.",
        createdAt: new Date().toISOString()
      };
      storage.saveMessage(reply);
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      
      <div className="section-container pt-32 pb-20 flex-1 flex flex-col">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex overflow-hidden flex-1 min-h-[600px]">
          <div className={cn(
            "w-full md:w-80 border-r border-gray-100 flex flex-col bg-surface/30",
            selectedThread ? "hidden md:flex" : "flex"
          )}>
            <div className="p-6 border-b border-gray-100 bg-white">
              <h1 className="text-2xl font-black mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search chats..." className="w-full bg-surface py-2.5 pl-10 pr-4 rounded-xl text-sm outline-none border border-transparent focus:border-primary transition-all" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  onClick={() => setSelectedThread(conv.id)}
                  className={cn(
                    "p-6 flex items-center gap-4 cursor-pointer transition-all border-l-4",
                    selectedThread === conv.id 
                      ? "bg-white border-primary shadow-sm" 
                      : "border-transparent hover:bg-white hover:border-gray-200"
                  )}
                >
                   <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                      <img src={conv.user?.avatar} alt={conv.user?.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-text-primary text-sm truncate">{conv.user?.name}</h4>
                      <span className="text-[10px] font-bold text-text-secondary">
                        {new Date(conv.lastMessage.createdAt).getHours()}:{new Date(conv.lastMessage.createdAt).getMinutes().toString().padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary truncate">{conv.lastMessage.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "flex-1 flex flex-col bg-white",
            !selectedThread ? "hidden md:flex justify-center items-center p-20 text-center" : "flex"
          )}>
            {selectedThread ? (
              <>
                <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedThread(null)} className="md:hidden text-text-secondary"><ChevronLeft /></button>
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                      <img src={otherUser?.avatar} alt="other" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h3 className="font-bold text-text-primary">{otherUser?.name}</h3>
                       <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-success" />
                         <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Online</span>
                       </div>
                    </div>
                  </div>
                  <button className="p-2 text-text-secondary hover:bg-surface rounded-full transition-colors">
                    <MoreHorizontal />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface/10">
                   {messages.map((m) => (
                     <div key={m.id} className={cn(
                       "flex flex-col max-w-[80%]",
                       m.senderId === user.id ? "ml-auto items-end" : "mr-auto items-start"
                     )}>
                        <div className={cn(
                          "p-4 rounded-2xl text-sm font-medium shadow-sm",
                          m.senderId === user.id ? "bg-primary text-white rounded-tr-none" : "bg-white text-text-primary rounded-tl-none border border-gray-100"
                        )}>
                          {m.content}
                        </div>
                        <span className="text-[10px] font-bold text-text-secondary mt-1 uppercase tracking-widest">
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                     </div>
                   ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex gap-4 items-center">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-1 bg-surface py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all border border-transparent font-medium"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50">
                      <Send size={24} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6">
                 <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-primary">
                  <MessageSquare size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2">Your Inbox</h3>
                  <p className="text-text-secondary max-w-sm">Select a conversation to start messaging verified landlords and agents.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
