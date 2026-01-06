import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
const router = Router();
// Fallback data in case DB is empty or fails
const fallbackCategories = [
    { id: 1, name: 'Imóveis', icon: 'home' },
    { id: 2, name: 'Autos', icon: 'car' },
    { id: 3, name: 'Autopeças', icon: 'wrench' },
    { id: 4, name: 'Celulares e Telefonia', icon: 'smartphone' },
    { id: 5, name: 'Casa e Decoração', icon: 'sofa' },
    { id: 6, name: 'Esportes e Fitness', icon: 'bike' },
    { id: 7, name: 'Serviços', icon: 'briefcase' },
];
router.get('/', async (req, res) => {
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
        // Return fallback if no data found
        res.json(fallbackCategories);
    }
    catch (err) {
        console.error('Failed to fetch categories:', err);
        res.json(fallbackCategories);
    }
});
export default router;
