'use client'

import { supabase } from '@/supabase/supabase-app';

export default function SignInWithGithub() {
  async function handleSignInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github', options: { skipBrowserRedirect: true }
    })
    window.open(data.url || '/', '_blank')

    console.log(data, error)
  }

  return (
    <button onClick={handleSignInWithGithub} type="button" className="text-white bg-[#24292e] hover:bg-[#1f2428] focus:ring-[#1f2428]/50 text-center items-center dark:focus:ring-[#1f2428]/55 mr-2 mb-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-5">
      <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256c0 113.4 73.9 209.4 176 243.7 12.9 2.4 17.6-5.6 17.6-12.3v-45.3c-71.5 15.6-86.5-32.4-86.5-32.4-11.7-29.6-28.6-37.5-28.6-37.5-23.4-16.1 1.8-15.8 1.8-15.8 25.9 1.8 39.5 26.6 39.5 26.6 23 39.5 60.3 28.1 74.9 21.5 2.3-16.7 9.1-28.1 16.5-34.5-57.6-6.6-118-28.8-118-128.2 0-28.3 10.1-51.5 26.6-69.6-2.7-6.6-11.5-33 2.4-68.8 0 0 21.9-7 71.5 26.6 20.7-5.8 43-8.7 65.2-8.7s44.5 2.9 65.2 8.7c49.6-33.6 71.5-26.6 71.5-26.6 14 35.8 5.2 62.2 2.5 68.8 16.5 18.1 26.5 41.3 26.5 69.6 0 99.8-60.5 121.4-118.2 127.7 9.3 8 17.5 23.7 17.5 47.8v70.7c0 6.7 4.6 14.7 17.6 12.3C438.1 465.4 512 369.4 512 256 512 119 401 8 256 8z"></path></svg>
      Sign in with GitHub
    </button>
  )
}