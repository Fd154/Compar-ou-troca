import { supabase } from '../lib/supabase.js';

export const config = {
  runtime: 'nodejs',
};

const fallbackCategories = [
  { id: 1, name: 'Imóveis', icon: 'home' },
  { id: 2, name: 'Autos', icon: 'car' },
  { id: 3, name: 'Autopeças', icon: 'wrench' },
  { id: 4, name: 'Celulares e Telefonia', icon: 'smartphone' },
  { id: 5, name: 'Casa e Decoração', icon: 'sofa' },
  { id: 6, name: 'Esportes e Fitness', icon: 'bike' },
  { id: 7, name: 'Serviços', icon: 'briefcase' },
];

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (data && data.length > 0) {
      return res.json(data);
    }
    
    return res.json(fallbackCategories);
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return res.json(fallbackCategories);
  }
}
