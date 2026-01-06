import { z } from 'zod';
import { supabase } from '../lib/supabase.js';

export const config = {
  runtime: 'nodejs',
};

const createProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string(),
  images: z.array(z.string()).optional()
});

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    try {
      const { data: products, error, count } = await supabase
        .from('products')
        .select('*, categories(name)', { count: 'exact' })
        .range((page - 1) * pageSize, page * pageSize - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedProducts = products?.map((p: any) => ({
        ...p,
        category: p.categories?.name || 'Outros',
        date: new Date(p.created_at).toLocaleDateString('pt-BR'),
        seller: p.seller_name || 'Anônimo',
        sellerAvatar: p.seller_avatar || 'https://via.placeholder.com/100',
        images: p.images || [p.image]
      })) || [];

      return res.status(200).json({
        items: transformedProducts,
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize)
      });
    } catch (err: any) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = createProductSchema.parse(req.body);
      
      let categoryId = null;
      if (body.category) {
        const { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('name', body.category)
          .single();
        categoryId = cat?.id;
      }

      const newProduct = {
        title: body.title,
        description: body.description,
        price: body.price,
        category_id: categoryId,
        image: body.images?.[0] || 'https://via.placeholder.com/400',
        images: body.images || ['https://via.placeholder.com/400'],
        location: 'Brasil', // Default
        seller_name: 'Usuário Teste', // Mock until auth is fully integrated
        seller_avatar: 'https://via.placeholder.com/100'
      };

      const { data, error } = await supabase
        .from('products')
        .insert(newProduct)
        .select()
        .single();

      if (error) throw error;

      return res.status(201).json(data);

    } catch (err: any) {
      console.error('Error creating product:', err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ error: 'Failed to create product' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
