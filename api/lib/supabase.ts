import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
// process.env is automatically populated by Vercel
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase environment variables missing in api/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
