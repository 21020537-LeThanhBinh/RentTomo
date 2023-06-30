'use client';

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase/supabase-app";
import HeartButton from "@/components/HeartButton";
import MediaSlider from "@/components/MediaSlider";
import handleCloseDialog from "@/utils/handleCloseDialog";
import Heading from "@/components/Heading";

interface ListingHeadProps {
  imageSrc: string[];
  id: string;
  title: string;
  created_at: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  imageSrc,
  id,
  title,
  created_at
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const date = new Date(created_at);

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
    <>
      <div className="flex justify-between">
        <Heading
          title={title}
          subtitle={`Ngày đăng: ${((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()}`}
        />

        <div className="flex items-end">
          <HeartButton
            listingId={id}
            userId={userId}
            full
          />
        </div>
      </div>

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

        <dialog ref={dialogRef} className="popup h-[90vh] w-[90vw] overflow-hidden bg-transparent">
          <MediaSlider
            images={imageSrc}
            index={imageIndex}
            fullView={true}
            onClose={() => dialogRef.current?.close()}
          />
        </dialog>

        <div id="head" className="absolute bottom-12"></div>
      </div>
    </>
  );
}

export default ListingHead;