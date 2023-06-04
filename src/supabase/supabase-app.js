const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 
  {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
)

export { supabase };