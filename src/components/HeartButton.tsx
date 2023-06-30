'use client';

import useFollow from "@/hooks/useFollow";
import { useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface HeartButtonProps {
  listingId: string
  userId?: string | null
  setHasFollowed?: (hasFollowed: boolean) => void
  full?: boolean
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  userId,
  setHasFollowed,
  full
}) => {
  const { hasFollowed, toggleFavorite } = useFollow({
    listingId,
    userId
  });

  useEffect(() => {
    setHasFollowed?.(hasFollowed);
  }, [hasFollowed]);

  const Button = () => (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
        group-hover:opacity-80
      "
    >
      <BsBookmark
        size={24}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <BsBookmarkFill
        size={20}
        className={
          hasFollowed ? 'fill-sky-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  );

  if (!full) return <Button />

  return (
    <div onClick={toggleFavorite} className="flex items-center gap-2 cursor-pointer group">
      <Button />
      <span className="text-neutral-600 underline">Lưu</span>
    </div>
  );
}

export default HeartButton;