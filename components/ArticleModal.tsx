
import React from 'react';
import { NewsItem } from '../types';
import { X, Share2, Bookmark, ArrowLeft } from 'lucide-react';

interface ArticleModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
        </button>
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-600 dark:text-slate-400"><Bookmark size={22} /></button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-600 dark:text-slate-400"><Share2 size={22} /></button>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-4">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{news.category}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center mt-4 space-x-3">
            <div className="bg-gray-100 dark:bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-500 dark:text-slate-400">
              {news.source.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{news.source}</div>
              <div className="text-xs text-gray-500 dark:text-slate-500">{news.timestamp}</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mb-6 shadow-xl shadow-red-500/5">
          <img src={news.imageUrl} alt={news.title} className="w-full h-auto object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-slate-300 leading-relaxed space-y-4">
          <p className="font-semibold text-lg text-gray-700 dark:text-slate-200">{news.description}</p>
          <p>{news.content}</p>
          <p className="italic text-sm text-gray-500 dark:text-slate-500 border-l-4 border-red-600 pl-4 mt-8">
            Stay updated with hunttech for the latest in global technology, gadgets, and breakthroughs.
          </p>
        </div>

        <div className="mt-12 border-t dark:border-slate-800 pt-8">
          <h3 className="text-lg font-bold mb-4 dark:text-white">Leave a Comment</h3>
          <textarea 
            className="w-full border dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-50 dark:bg-slate-800 dark:text-white transition-colors"
            placeholder="What are your thoughts?"
            rows={3}
          ></textarea>
          <button className="mt-2 bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-transform active:scale-95 shadow-lg shadow-red-600/20">Post Comment</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
