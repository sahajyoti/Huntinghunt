
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Menu, Bell, TrendingUp, Smartphone, Cpu, Globe, Rocket, Bookmark, User, Languages, RefreshCw, LogOut, Moon, Sun, ChevronUp } from 'lucide-react';
import { NewsItem, Language, User as UserType, getCategoriesByLang } from './types';
import { fetchLatestTechNews } from './newsService';
import NewsCard from './NewsCard';
import AdCard from './AdCard';
import ArticleModal from './ArticleModal';
import LoginModal from './LoginModal';
import IntroOverlay from './IntroOverlay';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('bn');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const refreshInterval = useRef<number | null>(null);
  const categories = getCategoriesByLang(language);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('hunttech_theme', newMode ? 'dark' : 'light');
  };

  const loadNews = useCallback(async (cat?: string, lang?: Language, prefs?: string[]) => {
    setLoading(true);
    const targetLang = lang || language;
    const targetCat = cat || activeCategory || categories[0];
    const targetPrefs = prefs || user?.preferences || [];
    
    const data = await fetchLatestTechNews(targetCat, targetLang, targetPrefs);
    setNews(data);
    setLoading(false);
    setIsRefreshing(false);
  }, [language, activeCategory, user, categories]);

  useEffect(() => {
    loadNews();
    refreshInterval.current = window.setInterval(() => {
      loadNews();
    }, 600000); // 10 minutes auto-refresh
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (refreshInterval.current) clearInterval(refreshInterval.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadNews]);

  useEffect(() => {
    const savedUser = localStorage.getItem('hunttech_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as UserType;
      setUser(parsedUser);
      setLanguage(parsedUser.language);
    }

    const savedTheme = localStorage.getItem('hunttech_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const handleLogin = (newUser: UserType) => {
    setUser(newUser);
    setLanguage(newUser.language);
    localStorage.setItem('hunttech_user', JSON.stringify(newUser));
    setShowLogin(false);
    loadNews(undefined, newUser.language, newUser.preferences);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hunttech_user');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadNews();
  };

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (user) {
      const updatedUser = { ...user, language: newLang };
      setUser(updatedUser);
      localStorage.setItem('hunttech_user', JSON.stringify(updatedUser));
    }
    loadNews(undefined, newLang);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWelcomeText = () => {
    if (language === 'bn') return `স্বাগতম, ${user?.name || 'পাঠক'}`;
    if (language === 'hi') return `स्वागत है, ${user?.name || 'পাঠक'}`;
    return `Welcome, ${user?.name || 'Reader'}`;
  };

  return (
    <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto shadow-2xl bg-white dark:bg-slate-900 transition-colors duration-300 md:bg-gray-100 md:dark:bg-slate-950 font-sans">
      <IntroOverlay />

      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 dark:border-slate-800 border-b border-gray-100 px-4 py-3 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-3">
          <Menu className="text-gray-600 dark:text-slate-400 lg:hidden" />
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => { setActiveCategory(categories[0]); loadNews(categories[0]); }}>
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white p-1 rounded-lg font-black text-2xl shadow-lg shadow-red-500/20">h</div>
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white hidden sm:block">
              hunt<span className="text-red-600">tech</span>
            </h1>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder={language === 'bn' ? "খবর খুঁজুন..." : language === 'hi' ? "खबरें खोजें..." : "Search news..."} 
              className="w-full bg-gray-100 dark:bg-slate-800 dark:text-white border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={toggleDarkMode} className="p-2 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-1 py-1">
            {(['bn', 'en', 'hi'] as Language[]).map((l) => (
              <button key={l} onClick={() => changeLanguage(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === l ? 'bg-white dark:bg-slate-700 shadow-sm text-red-600' : 'text-gray-500 dark:text-slate-400'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button onClick={handleRefresh} className={`p-2 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCw size={20} />
          </button>

          {user ? (
            <div className="flex items-center space-x-2 border-l dark:border-slate-800 pl-4">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-none">{user.name}</p>
                <button onClick={handleLogout} className="text-[10px] text-red-500 font-bold hover:underline">Logout</button>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full text-red-600">
                <User size={20} />
              </div>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-200 dark:shadow-red-900/20">
              Sign In
            </button>
          )}
        </div>
      </header>

      <nav className="sticky top-[58px] z-30 bg-white dark:bg-slate-900 dark:border-slate-800 border-b border-gray-100 overflow-x-auto whitespace-nowrap px-2 flex items-center no-scrollbar transition-colors">
        {categories.map((cat) => (
          <button key={cat} onClick={() => { setActiveCategory(cat); loadNews(cat); }}
            className={`px-4 py-3 text-sm font-bold transition-all border-b-2 ${
              (activeCategory === cat || (!activeCategory && cat === categories[0]))
                ? 'text-red-600 border-red-600 bg-red-50/30 dark:bg-red-900/10' 
                : 'text-gray-500 dark:text-slate-400 border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main className="flex-1 flex flex-col md:flex-row p-0 md:p-6 md:space-x-6">
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-100 dark:border-slate-800 border-t-red-600"></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-red-600 text-xs">h</div>
              </div>
              <p className="text-gray-500 dark:text-slate-400 font-bold">
                {language === 'bn' ? 'তাজা খবর আসছে...' : language === 'hi' ? 'ताज़ा खबरें आ रही हैं...' : 'Fetching fresh news...'}
              </p>
            </div>
          ) : (
            <div className="space-y-1 md:space-y-4">
              {news.map((item, index) => (
                <React.Fragment key={item.id}>
                  <NewsCard news={item} onClick={setSelectedNews} />
                  {(index + 1) % 10 === 0 && (
                    <div className="px-4 md:px-0">
                      <AdCard type={(index + 1) % 20 === 0 ? "internal" : "google"} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <aside className="hidden lg:block w-80 space-y-6">
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp size={20} className="text-red-600" />
              <h2 className="font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">Trending Now</h2>
            </div>
            <ul className="space-y-5">
              {[
                { title: language === 'bn' ? "স্পেসএক্স এর নতুন রেকর্ড" : "SpaceX New Record", rank: "1" },
                { title: language === 'bn' ? "এআই প্রযুক্তিতে নতুন মোড়" : "AI Tech New Turn", rank: "2" },
                { title: language === 'bn' ? "গুগল এর বড় ঘোষণা" : "Google Big Announcement", rank: "3" }
              ].map((trend, i) => (
                <li key={i} className="flex space-x-4 group cursor-pointer items-start">
                  <span className="text-red-600/20 dark:text-red-600/40 font-black text-3xl italic leading-none">{trend.rank}</span>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-red-600 transition-colors pt-1">
                    {trend.title}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <AdCard type="google" />
        </aside>
      </main>

      <ArticleModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-20 right-6 z-50 p-3 bg-red-600 text-white rounded-full shadow-2xl">
          <ChevronUp size={24} />
        </button>
      )}

      <nav className="md:hidden sticky bottom-0 z-40 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex justify-around items-center py-2 transition-colors">
        <button onClick={() => { setActiveCategory(categories[0]); loadNews(categories[0]); }} className="flex flex-col items-center text-red-600">
          <Globe size={22} />
          <span className="text-[10px] font-bold mt-1 uppercase">Feed</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 dark:text-slate-500">
          <TrendingUp size={22} />
          <span className="text-[10px] font-bold mt-1 uppercase">Top</span>
        </button>
        <button onClick={() => user ? handleLogout() : setShowLogin(true)} className="flex flex-col items-center text-gray-400 dark:text-slate-500">
          {user ? <LogOut size={22} /> : <User size={22} />}
          <span className="text-[10px] font-bold mt-1 uppercase">{user ? 'Exit' : 'User'}</span>
        </button>
        <button onClick={toggleDarkMode} className="flex flex-col items-center text-gray-400 dark:text-slate-500">
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          <span className="text-[10px] font-bold mt-1 uppercase">Theme</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
