import React, { useState } from 'react';
import { Send, Upload, ShieldCheck, Globe, FileText, Sparkles, User, LogOut } from 'lucide-react';

export default function AIPlatform() {
  // Global State: 'auth', 'user_chat', or 'admin_dashboard'
  const [view, setView] = useState('auth');
  const [user, setUser] = useState({ role: '', domain: '', name: '' });
  const [chatInput, setChatInput] = useState('');

  // 1. Initial State / Database Mockup
  const state = {
    view: 'signup',
    currentUser: null,
    // Mock data to simulate resources uploaded by different admins
    resources: {
      legal: ["Contract_Template.pdf", "Privacy_Policy_v2.docx"],
      medical: ["Clinical_Trial_Data.pdf", "Patient_Safety_Protocol.pdf"],
      tech: ["API_Documentation.md", "System_Architecture.png"]
    }
  };

  // 2. ADMIN INTERFACE
  if (view === 'admin_dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <nav className="h-16 bg-white border-b flex items-center justify-between px-8">
          <span className="font-bold text-indigo-600 flex items-center gap-2"><ShieldCheck size={20}/> Admin Panel</span>
          <button onClick={() => setView('auth')} className="text-slate-400 hover:text-red-500 transition"><LogOut size={20}/></button>
        </nav>
        <main className="flex-1 p-10 max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-2">Upload Sector Resources</h2>
          <p className="text-slate-500 mb-8">Files uploaded here will only be accessible to users in the <span className="text-indigo-600 font-bold">Legal</span> domain.</p>
          
          <div className="border-4 border-dashed border-slate-200 rounded-3xl p-20 text-center hover:border-indigo-300 transition-colors bg-white">
            <Upload className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-lg font-medium">Drop PDFs or Training Data here</p>
            <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium">Browse Files</button>
          </div>
        </main>
      </div>
    );
  }

  // 3. USER CHAT INTERFACE
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="h-16 border-b flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex flex-col">
          <span className="font-bold text-slate-800">Nexus AI</span>
          <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-bold">
            {user.role === 'general' ? '🌍 Global Access' : `🔒 ${user.domain} Domain`}
          </span>
        </div>
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm border border-slate-200">
          {user.name.charAt(0)}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-3">
            <Sparkles className="text-white" size={40} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">How can I assist you?</h2>
          <p className="text-slate-500 text-lg">
            {user.role === 'general' 
              ? "I am currently searching across all organizational resources." 
              : `I am locked to the ${user.domain} knowledge base provided by your Admin.`}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left hover:bg-slate-100 cursor-pointer transition">
              <p className="font-bold text-slate-700 mb-1">Analyze data</p>
              <p className="text-sm text-slate-500">Based on recently uploaded docs...</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left hover:bg-slate-100 cursor-pointer transition">
              <p className="font-bold text-slate-700 mb-1">Summarize</p>
              <p className="text-sm text-slate-500">Get the key points from your domain...</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 max-w-3xl mx-auto w-full">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder={`Ask about ${user.domain}...`}
            className="w-full p-5 pr-16 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
          />
          <button className="absolute right-3 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">Powered by Secure Sector RAG</p>
      </footer>
    </div>
  );
}