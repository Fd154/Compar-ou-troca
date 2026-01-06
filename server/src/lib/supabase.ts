import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || ''; // Use Service Role Key for backend actions if needed, or Anon Key

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL or Key not found in environment variables. Database operations will fail.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
