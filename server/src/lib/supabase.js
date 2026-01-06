import { createClient } from '@supabase/supabase-js';
// dotenv is not needed in Vercel production environment as env vars are injected
// and can cause issues if .env file is missing or path is wrong
if (process.env.NODE_ENV !== 'production') {
    try {
        // Dynamic import to avoid build-time errors if dotenv is missing
        import('dotenv').then(d => d.config());
    }
    catch (e) {
        // Ignore error
    }
}
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'placeholder';
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('❌ CRITICAL: Supabase environment variables are missing. Database calls will fail.');
}
export const supabase = createClient(supabaseUrl, supabaseKey);
