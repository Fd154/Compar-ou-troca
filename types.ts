export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  location: string;
  date: string;
  description: string;
  seller: string;
  sellerAvatar: string;
  images: string[];
  // Flexible object to store specific attributes like year, mileage, bedrooms, etc.
  details?: Record<string, string | number | boolean>;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  product?: string;
}