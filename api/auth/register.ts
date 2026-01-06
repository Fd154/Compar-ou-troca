import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client directly
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Basic validation to warn in logs (not crashing)
if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase credentials in register handler');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  // CORS Handling
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Register] Processing request');
    const body = req.body;
    
    // Parse body
    const { email, password, name } = registerSchema.parse(body);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) throw error;

    return res.status(201).json({
      token: data.session?.access_token,
      user: {
        id: data.user?.id,
        name: data.user?.user_metadata?.name,
        email: data.user?.email
      }
    });

  } catch (error: any) {
    console.error('[Register] Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: error.message || 'Registration failed' });
  }
}
