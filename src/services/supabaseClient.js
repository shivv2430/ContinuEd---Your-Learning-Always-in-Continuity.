/**
 * Supabase Client Initialization
 * Safely handles missing credentials with zero crashes
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL !== 'https://your-project.supabase.co' &&
  !SUPABASE_ANON_KEY.includes('your-anon-key')
);

// Minimal safe client stub if supabase-js is not installed or unconfigured
export const supabase = {
  isConfigured: isSupabaseConfigured,
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase unconfigured - using demo mode') }),
    signUp: async () => ({ data: null, error: new Error('Supabase unconfigured - using demo mode') }),
    signOut: async () => ({ error: null }),
  },
  from: (table) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  }),
};
