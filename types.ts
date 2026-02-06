
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  source: string;
  timestamp: string;
  imageUrl: string;
  url?: string;
}

export type Language = 'bn' | 'en' | 'hi';

export interface User {
  name: string;
  email: string;
  preferences: string[];
  language: Language;
}

export interface AdItem {
  id: string;
  type: 'google' | 'internal';
  title?: string;
  description?: string;
  cta?: string;
  imageUrl?: string;
}

export type Category = 'সব খবর' | 'স্মার্টফোন' | 'গ্যাজেট' | 'এআই' | 'অ্যাপস' | 'বিজ্ঞান' | 'ইন্টারনেট' | 'Smartphones' | 'Gadgets' | 'AI' | 'Apps' | 'Science' | 'Internet';

export const CATEGORIES_BN: string[] = ['সব খবর', 'স্মার্টফোন', 'গ্যাজেট', 'এআই', 'অ্যাপস', 'বিজ্ঞান', 'ইন্টারনেট'];
export const CATEGORIES_EN: string[] = ['All News', 'Smartphones', 'Gadgets', 'AI', 'Apps', 'Science', 'Internet'];
export const CATEGORIES_HI: string[] = ['मुख्य समाचार', 'स्मार्टफोन', 'गैजेट्स', 'एआई', 'एप्स', 'विज्ञान', 'इंटरनेट'];

export const getCategoriesByLang = (lang: Language) => {
  if (lang === 'en') return CATEGORIES_EN;
  if (lang === 'hi') return CATEGORIES_HI;
  return CATEGORIES_BN;
};
