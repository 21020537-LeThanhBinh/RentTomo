'use client';

import useFollow from "@/hooks/useFollow";
import { BsBell, BsBellFill } from "react-icons/bs";

interface HeartButtonProps {
  listingId: string
  userId?: string | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  userId
}) => {
  const { hasFollowed, toggleFavorite } = useFollow({
    listingId,
    userId
  });

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
      <BsBell
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <BsBellFill
        size={24}
        className={
          hasFollowed ? 'fill-yellow-400' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}

export default HeartButton;