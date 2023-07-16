'use client'

import { supabase } from '@/supabase/supabase-app';

export default function SignInWithFacebook() {
  async function handleSignInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    })

    console.log(data, error)
  }

  return (
    <button onClick={handleSignInWithFacebook} type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-[#3b5998]/50 text-center items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-5">
      <svg className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.3 288h-56.5v160h-64V288h-32v-64h32v-64.2C134.3 84.1 170 48 217.7 48h67.8v64h-43.7c-20.2 0-24 7.6-24 23.6V224h68.3l-8 64z"></path></svg>
      Đăng nhập với Facebook
    </button>

  )
}