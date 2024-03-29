'use client'

import { supabase } from "@/supabase/supabase-app";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { event } from "@/lib/ga"

export default function PostBtn({ isWhite }: { isWhite?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setIsLoggedIn(true)
      else setIsLoggedIn(false)
    })
  }, []);

  const onClick = useCallback((e: any) => {
    event({
      action: 'post_btn_click',
      params: {
        isLoggedIn: isLoggedIn,
      }
    })

    if (!isLoggedIn) {
      e.preventDefault()
      return router.push(`${pathname}?popup=login`)
    }
  }, [isLoggedIn, router, pathname]);

  return (
    <Link href={'/post'} onClick={onClick} className={`py-3 px-5 rounded-full text-center whitespace-nowrap hover:shadow-md transition font-semibold bg-sky-500 text-white ${isWhite && 'border-2 border-white bg-transparent'}`}>
      <span>Đăng tin</span>
    </Link>
  )
}