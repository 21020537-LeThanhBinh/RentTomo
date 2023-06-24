'use client';

import useFollow from "@/hooks/useFollow";
import { useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface HeartButtonProps {
  listingId: string
  userId?: string | null
  setHasFollowed?: (hasFollowed: boolean) => void
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  userId,
  setHasFollowed
}) => {
  const { hasFollowed, toggleFavorite } = useFollow({
    listingId,
    userId
  });

  useEffect(() => {
    setHasFollowed?.(hasFollowed);
  }, [hasFollowed]);

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <BsBookmark
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <BsBookmarkFill
        size={24}
        className={
          hasFollowed ? 'fill-sky-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}

export default HeartButton;