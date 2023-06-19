'use client';

import Image from "next/image";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase-app";
import HeartButton from "@/components/HeartButton";

interface ListingHeadProps {
  imageSrc: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  imageSrc,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)

      if (event === 'INITIAL_SESSION') setIsLoading(false)
    })
  }, []);

  return (
    <>
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          alt="Image"
          className="object-cover w-full"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          {!isLoading && (
            <HeartButton
              listingId={id}
              userId={userId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ListingHead;