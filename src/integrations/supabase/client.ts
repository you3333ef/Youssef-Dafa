import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const DEFAULT_SUPABASE_URL = 'https://bwnhaqbmccvajrkwsslo.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bmhhcWJtY2N2YWpya3dzc2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyOTA5OTEsImV4cCI6MjA0Mzg2Njk5MX0.pQ8OEOYqk_jl0l2hJZBZLbww82HfJwb8OBLr4F3HtBY';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY;

if (import.meta.env.DEV && (SUPABASE_URL === DEFAULT_SUPABASE_URL || SUPABASE_PUBLISHABLE_KEY === DEFAULT_SUPABASE_KEY)) {
  console.info('ℹ️ Using default Supabase credentials. Override with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env for production.');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});