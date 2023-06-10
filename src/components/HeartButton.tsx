'use client';

import useFollow from "@/hooks/useFollow";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFollowed ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default HeartButton;