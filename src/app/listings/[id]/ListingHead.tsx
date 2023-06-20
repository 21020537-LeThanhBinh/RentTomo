'use client';

import Image from "next/image";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase-app";
import HeartButton from "@/components/HeartButton";

interface ListingHeadProps {
  imageSrc: string[];
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
      <div className="w-full h-[30vh] sm:h-[60vh] overflow-hidden rounded-xl relative">
        {/* Images on phone */}
        <Image
          src={imageSrc?.[0]}
          fill
          alt="Image"
          className="object-cover w-full sm:hidden"
        />

        {/* Images on desktop */}
        {imageSrc.length === 1 ? (
          <Image
            src={imageSrc?.[0]}
            fill
            alt="Image"
            className="object-cover w-full"
          />
        ) : imageSrc.length < 5 ? (
          <div className="hidden sm:flex gap-1">
            <div className="relative w-1/2 h-[60vh]">
              <Image
                src={imageSrc?.[0]}
                fill
                alt="Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <div className="relative h-[30vh]">
                <Image
                  src={imageSrc?.[1]}
                  fill
                  alt="Image"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[30vh]">
                <Image
                  src={imageSrc?.[2]}
                  fill
                  alt="Image"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex gap-1">
            <div className="relative w-1/2 h-[60vh]">
              <Image
                src={imageSrc?.[0]}
                fill
                alt="Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/4">
              <div className="relative h-[30vh]">
                <Image
                  src={imageSrc?.[1]}
                  fill
                  alt="Image"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[30vh]">
                <Image
                  src={imageSrc?.[2]}
                  fill
                  alt="Image"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-1/4">
              <div className="relative h-[30vh]">
                <Image
                  src={imageSrc?.[3]}
                  fill
                  alt="Image"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[30vh]">
                <Image
                  src={imageSrc?.[4]}
                  fill
                  alt="Image"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-5 right-5">
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