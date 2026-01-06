import { Router } from 'express';
import { z } from 'zod';

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

router.post('/register', (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  
  // In a real app, we would save the user to a database here
  const newUser = {
    id: Date.now(),
    name: parsed.data.name,
    email: parsed.data.email
  };
  
  const token = 'mock-token-' + newUser.id;
  
  res.status(201).json({ 
    token, 
    user: newUser 
  });
});

router.post('/login', (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const token = 'mock-token';
  res.json({ token, user: { id: 1, name: 'Você', email: parsed.data.email } });
});

export default router;

