
import React, { useState } from 'react';
import { X, User, Mail, Settings } from 'lucide-react';
import { User as UserType, Language, getCategoriesByLang } from '../types';

interface LoginModalProps {
  onLogin: (user: UserType) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lang, setLang] = useState<Language>('bn');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  const togglePref = (pref: string) => {
    setSelectedPrefs(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onLogin({
      name,
      email,
      preferences: selectedPrefs,
      language: lang
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 border border-gray-100 dark:border-slate-800">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">hunt<span className="text-red-600">tech</span></h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-500">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none dark:text-white transition-all"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none dark:text-white transition-all"
                  placeholder="rahul@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Reader Language</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bn', label: 'বাংলা' },
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'हिन्दी' }
                ].map((l) => (
                  <button
                    key={l.id} type="button"
                    onClick={() => setLang(l.id as Language)}
                    className={`py-2 px-1 text-sm font-bold rounded-xl border transition-all ${
                      lang === l.id 
                        ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20' 
                        : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-red-400'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">My Tech Interests</label>
              <div className="flex flex-wrap gap-2">
                {getCategoriesByLang(lang).slice(1).map(pref => (
                  <button
                    key={pref} type="button"
                    onClick={() => togglePref(pref)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      selectedPrefs.includes(pref)
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 border-red-200 dark:border-red-900/50'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border-transparent'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-transform active:scale-[0.98] mt-4 uppercase tracking-widest"
            >
              Start My Feed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
