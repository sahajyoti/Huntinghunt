
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdCardProps {
  type: 'google' | 'internal';
  title?: string;
  description?: string;
  imageUrl?: string;
}

const AdCard: React.FC<AdCardProps> = ({ type, title, description, imageUrl }) => {
  if (type === 'google') {
    return (
      <div className="bg-gray-50 dark:bg-slate-800/50 border border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-6 mb-4 flex flex-col items-center justify-center min-h-[250px] transition-colors">
        <div className="text-[10px] uppercase text-gray-400 dark:text-slate-500 mb-4 tracking-[0.2em] font-bold">Sponsored Advertisement</div>
        <div className="w-full h-40 bg-gray-200 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center space-y-2 group">
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-slate-700 flex items-center justify-center text-gray-400 font-black">G</div>
          <span className="text-gray-400 dark:text-slate-500 font-bold text-xs">Ad by Google</span>
        </div>
        <div className="mt-4 text-center w-full">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800 mx-auto rounded-full mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-100 dark:bg-slate-800/50 mx-auto rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-red-50 dark:border-red-900/10 rounded-2xl overflow-hidden mb-4 shadow-sm hover:shadow-md transition-all group">
      <div className="relative h-44 overflow-hidden">
        <img 
          src={imageUrl || 'https://picsum.photos/seed/promo/800/400'} 
          alt="Promotion"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-lg">
          Exclusive
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-black text-gray-900 dark:text-white mb-2 text-lg tracking-tight">{title || 'Premium Upgrade'}</h3>
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 leading-relaxed">{description || 'Get early access to tech leaks and in-depth hardware reviews.'}</p>
        <button className="w-full bg-slate-900 dark:bg-red-600 text-white py-3 rounded-xl text-sm font-black flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-red-700 transition-all shadow-lg active:scale-[0.97]">
          <span>LEARN MORE</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

export default AdCard;
