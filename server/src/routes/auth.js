import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
const router = Router();
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = registerSchema.parse(req.body);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });
        if (error)
            throw error;
        res.status(201).json({
            token: data.session?.access_token,
            user: {
                id: data.user?.id,
                name: data.user?.user_metadata.name,
                email: data.user?.email
            }
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Register error:', error);
        res.status(400).json({ error: 'Registration failed' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error)
            throw error;
        res.json({
            token: data.session?.access_token,
            user: {
                id: data.user?.id,
                name: data.user?.user_metadata.name || 'User',
                email: data.user?.email
            }
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Login error:', error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
export default router;
