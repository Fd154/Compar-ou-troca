import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
const router = Router();
// Zod Schema for creating a product
const createProductSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().positive(),
    category: z.string(),
    images: z.array(z.string()).optional()
});
router.get('/', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    try {
        const { data: products, error, count } = await supabase
            .from('products')
            .select('*, categories(name)', { count: 'exact' })
            .range((page - 1) * pageSize, page * pageSize - 1)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        // Transform data to match frontend expectations
        const transformedProducts = products?.map(p => ({
            ...p,
            category: p.categories?.name || 'Outros', // Join result
            date: new Date(p.created_at).toLocaleDateString('pt-BR'),
            seller: p.seller_name || 'Anônimo',
            sellerAvatar: p.seller_avatar || 'https://via.placeholder.com/100',
            images: p.images || [p.image]
        })) || [];
        res.json({
            items: transformedProducts,
            total: count || 0,
            page,
            pageSize,
            totalPages: Math.ceil((count || 0) / pageSize)
        });
    }
    catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const { data: product, error } = await supabase
            .from('products')
            .select('*, categories(name)')
            .eq('id', id)
            .single();
        if (error)
            return res.status(404).json({ message: 'Product not found' });
        const transformedProduct = {
            ...product,
            category: product.categories?.name || 'Outros',
            date: new Date(product.created_at).toLocaleDateString('pt-BR'),
            seller: product.seller_name || 'Anônimo',
            sellerAvatar: product.seller_avatar || 'https://via.placeholder.com/100',
            images: product.images || [product.image],
            details: {} // Populate details if you add a jsonb column later
        };
        res.json(transformedProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const body = createProductSchema.parse(req.body);
        // First find category ID by name (since frontend sends name)
        // Ideally frontend should send ID, but keeping compatibility
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
            category_id: categoryId, // Relation
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
        if (error)
            throw error;
        res.status(201).json(data);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default router;
