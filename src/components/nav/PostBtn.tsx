'use client'

import { supabase } from "@/supabase/supabase-app";
import Link from "next/link";
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
    })
  }, []);

  const onClick = useCallback((e: any) => {
    if (!isLoggedIn) {
      e.preventDefault()
      return router.push(`${pathname}?popup=login`)
    }
  }, [isLoggedIn, pathname]);

  return (
    <Link href={'/post'} onClick={onClick} className="py-2 px-6 bg-rose-500 rounded-full text-white flex items-center whitespace-nowrap shadow-sm hover:shadow-md transition">
      Đăng tin
    </Link>
  )
}