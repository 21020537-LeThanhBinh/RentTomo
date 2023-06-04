'use client'

import { createClient } from '@supabase/supabase-js'

export default function ProfilePicture() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const signUp = () => {
    supabase.auth.signUp({
      email: 'lethanhbinh6203@gmail.com',
      password: 'password',
    })
  }

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: 'lethanhbinh6203@gmail.com',
      password: 'password',
    })
  }

  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <div className='flex-shrink-0'>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};