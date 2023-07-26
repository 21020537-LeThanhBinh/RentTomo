'use client';

import { supabase } from "@/supabase/supabase-app";
import { autoUpdate, flip, offset, shift, useClick, useFloating, useFocus, useInteractions } from '@floating-ui/react';
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileProps {
  size?: number;
  new_avatar_url: string | null | undefined;
  new_full_name: string | null | undefined;
  id: string | null | undefined;
}

const Profile: React.FC<ProfileProps> = ({
  size = 30,
  new_avatar_url,
  new_full_name,
  id,
}) => {
  const [profile, setProfile] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // const hover = useHover(context);
  const focus = useFocus(context);
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    // hover,
    focus,
    click,
  ]);

  useEffect(() => {
    if (!profile && isOpen) {
      supabase
        .from('profiles')
        .select('year_of_birth, is_male, contact, description')
        .eq('id', id)
        .then(({ data, error }) => {
          if (error) throw error;
          if (data) setProfile(data[0]);
        })
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex-shrink-0"
      >
        <Image
          height={size}
          width={size}
          alt={`${new_full_name}'s avatar`}
          src={new_avatar_url || '/images/placeholder.jpg'}
          title={new_full_name || 'Profile'}
          className="rounded-full aspect-square object-cover"
        />
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="relative w-[360px] border-[1px] rounded-xl bg-white flex gap-4 p-4 z-[5]"
        >
          <div className="flex-shrink-0">
            <Image
              height={96}
              width={96}
              alt="Avatar"
              src={new_avatar_url || '/images/placeholder.jpg'}
              className="rounded-full aspect-square object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 text-neutral-600 max-w-[216px]">
            <div>
              <span className="text-lg font-semibold whitespace-nowrap">{new_full_name} {' '}</span>
              <span>{profile?.year_of_birth ? `(${profile?.year_of_birth}) ` : ' '}</span>
              <span>({profile?.is_male === undefined ? "" : profile?.is_male ? "Nam" : "Nữ"})</span>
            </div>

            <div className="whitespace-pre-line text-sm">{profile?.contact}</div>

            <div className="whitespace-pre-line text-sm">{profile?.description}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;