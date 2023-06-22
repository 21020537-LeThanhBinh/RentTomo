'use client';

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase/supabase-app";
import HeartButton from "@/components/HeartButton";
import MediaSlider from "@/components/MediaSlider";
import handleCloseDialog from "@/utils/handleCloseDialog";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)

      if (event === 'INITIAL_SESSION') setIsLoading(false)
    })

    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, dialogRef.current!, () => dialogRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-[30vh] sm:h-[60vh] overflow-hidden rounded-xl relative">
      {/* Images on phone */}
      <Image
        src={imageSrc?.[0]}
        fill
        alt="Image"
        className="object-cover w-full sm:hidden cursor-pointer"
      />

      {/* Images on desktop */}
      <div className="hidden h-[102%] sm:grid grid-cols-4 grid-rows-2 gap-2">
        <div
          onClick={() => {
            !dialogRef.current?.open && dialogRef.current?.showModal()
          }}
          onMouseEnter={() => setImageIndex(0)}
          className={`
            relative cursor-pointer
            ${imageSrc.length === 4 ? 'row-span-1' : 'row-span-2'}
            ${imageSrc.length === 1 ? 'col-span-4' : 'col-span-2'}
          `}
        >
          <Image
            src={imageSrc?.[0]}
            fill
            alt="Image"
            className="object-cover"
          />
        </div>
        <div
          onClick={() => {
            !dialogRef.current?.open && dialogRef.current?.showModal()
          }}
          onMouseEnter={() => setImageIndex(1)}
          className={`
            relative cursor-pointer
            ${imageSrc.length === 2 ? 'row-span-2' : 'row-span-1'}
            ${imageSrc.length <= 4 ? 'col-span-2' : 'col-span-1'}
          `}
        >
          <Image
            src={imageSrc?.[1]}
            fill
            alt="Image"
            className="object-cover"
          />
        </div>
        <div
          onClick={() => {
            !dialogRef.current?.open && dialogRef.current?.showModal()
          }}
          onMouseEnter={() => setImageIndex(2)}
          className={`
            relative cursor-pointer
            row-span-1
            ${imageSrc.length <= 4 ? 'col-span-2' : 'col-span-1'}
          `}
        >
          <Image
            src={imageSrc?.[2]}
            fill
            alt="Image"
            className="object-cover"
          />
        </div>
        <div
          onClick={() => {
            !dialogRef.current?.open && dialogRef.current?.showModal()
          }}
          onMouseEnter={() => setImageIndex(3)}
          className={`
            relative cursor-pointer
            row-span-1
            ${imageSrc.length <= 4 ? 'col-span-2' : 'col-span-1'}
          `}
        >
          <Image
            src={imageSrc?.[3]}
            fill
            alt="Image"
            className="object-cover"
          />
        </div>
        <div
          onClick={() => {
            !dialogRef.current?.open && dialogRef.current?.showModal()
          }}
          onMouseEnter={() => setImageIndex(4)}
          className={`
            relative cursor-pointer
            row-span-1
            col-span-1
          `}
        >
          <Image
            src={imageSrc?.[4]}
            fill
            alt="Image"
            className="object-cover"
          />

          {imageSrc.length > 5 && (
            <div className={`
                absolute inset-0 flex items-center justify-center bg-neutral-500/70
                text-white font-bold text-4xl
                drop-shadow-sm
              `}
            >
              {imageSrc.length - 4}+
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-5 right-5">
        {!isLoading && (
          <HeartButton
            listingId={id}
            userId={userId}
          />
        )}
      </div>

      <dialog ref={dialogRef} className="popup h-[90vh] w-[90vw] overflow-hidden bg-transparent">
        <MediaSlider
          images={imageSrc}
          index={imageIndex}
          fullView={true}
          onClose={() => dialogRef.current?.close()}
        />
      </dialog>
    </div>
  );
}

export default ListingHead;