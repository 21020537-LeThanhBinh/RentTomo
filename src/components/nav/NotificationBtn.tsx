'use client'

import { supabase } from "@/supabase/supabase-app";
import { useEffect, useState } from "react";

export default function NotificationBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setIsLoggedIn(true)
      else setIsLoggedIn(false)
    })
  }, []);

  return (
    <div className="relative inline-block h-full">
      {isLoggedIn && (
        <button title="notification" className="p-3 rounded-full font-medium focus:outline-none">
          Thông báo
        </button>
      )}
    </div>
  );
};
