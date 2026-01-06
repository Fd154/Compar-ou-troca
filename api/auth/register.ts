import { z } from 'zod';
import { supabase } from '../_lib/supabase';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  console.log('[Register] Function invoked');
  
  // Debug Environment Variables (Safe logging)
  console.log('[Register] Environment Check:', {
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_KEY,
    nodeEnv: process.env.NODE_ENV
  });

  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
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
    console.log(`[Register] Method ${req.method} not allowed`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Register] Parsing body...');
    // Log body keys to verify payload structure without logging passwords
    const bodyKeys = req.body ? Object.keys(req.body) : [];
    console.log('[Register] Body keys received:', bodyKeys);

    if (!req.body) {
      throw new Error('Request body is empty');
    }

    const { email, password, name } = registerSchema.parse(req.body);
    console.log(`[Register] Validated payload for email: ${email}`);

    console.log('[Register] Calling Supabase auth.signUp...');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      console.error('[Register] Supabase error:', error);
      throw error;
    }

    console.log('[Register] Success. User ID:', data.user?.id);
    return res.status(201).json({
      token: data.session?.access_token,
      user: { 
        id: data.user?.id, 
        name: data.user?.user_metadata.name, 
        email: data.user?.email 
      }
    });

  } catch (error: any) {
    console.error('[Register] Critical Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: error.errors 
      });
    }

    return res.status(500).json({ 
      error: error.message || 'Internal Server Error',
      timestamp: new Date().toISOString()
    });
  }
}
