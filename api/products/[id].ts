import { supabase } from '../lib/supabase.js';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();

    if (error) return res.status(404).json({ message: 'Product not found' });

    const transformedProduct = {
      ...product,
      category: product.categories?.name || 'Outros',
      date: new Date(product.created_at).toLocaleDateString('pt-BR'),
      seller: product.seller_name || 'Anônimo',
      sellerAvatar: product.seller_avatar || 'https://via.placeholder.com/100',
      images: product.images || [product.image],
      details: {} 
    };

    return res.json(transformedProduct);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
