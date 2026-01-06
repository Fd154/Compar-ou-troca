import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase env vars missing in api/_lib/supabase.ts');
} else {
  console.log('✅ Supabase Client Initializing with URL:', supabaseUrl.substring(0, 15) + '...');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
