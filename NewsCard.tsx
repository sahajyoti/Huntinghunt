
import React from 'react';
import { NewsItem } from './types';
import { Share2, Bookmark, MessageCircle } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <div 
      onClick={() => onClick(news)}
      className="bg-white dark:bg-slate-900 mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border-b border-gray-100 dark:border-slate-800 last:border-0 md:rounded-xl md:border md:border-transparent md:dark:border-slate-800 hover:md:border-red-600/30 group"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/10 px-2 py-0.5 rounded">
                {news.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-slate-500">{news.timestamp}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-red-600 transition-colors">
              {news.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2 md:line-clamp-3">
              {news.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs font-medium text-gray-700 dark:text-slate-300 flex items-center">
              <span className="bg-gray-200 dark:bg-slate-700 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-[10px] text-gray-500 dark:text-slate-400">
                {news.source.charAt(0)}
              </span>
              {news.source}
            </div>
            <div className="flex space-x-4 text-gray-400 dark:text-slate-600">
              <MessageCircle size={18} className="hover:text-red-500 transition-colors" />
              <Bookmark size={18} className="hover:text-red-500 transition-colors" />
              <Share2 size={18} className="hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
