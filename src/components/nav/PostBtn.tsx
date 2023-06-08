'use client'

import { supabase } from "@/supabase/supabase-app";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PostBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setIsLoggedIn(true)
      else setIsLoggedIn(false)
      console.log(event, session)
    })
  }, []);

  const onClick = useCallback(() => {
    if (!isLoggedIn) {
      return router.push(`${pathname}?popup=login`)
    }

    router.push('/post')
  }, [isLoggedIn, pathname]);

  return (
    <button onClick={onClick} className="py-2 px-6 bg-rose-500 rounded-full text-white flex items-center flex-shrink-0 shadow-sm hover:shadow-md transition">
      Đăng tin
    </button>
  )
}