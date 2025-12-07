import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn('⚠️ Supabase credentials are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.');
}

export const supabase = SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      }
    });