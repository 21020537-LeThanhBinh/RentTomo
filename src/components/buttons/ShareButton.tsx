'use client';

import { BsFillShareFill } from "react-icons/bs";
import { event } from "@/lib/ga"

interface ShareButtonProps {
  listingId: string
  title: string
  userId?: string | null
}

const ShareButton: React.FC<ShareButtonProps> = ({
  listingId,
  title,
  userId,
}) => {
  const onShare = () => {
    navigator.share({
      title: title,
      text: 'Share',
      url: `https://renttomo.vercel.app/listings/${listingId}`
    })

    event({
      action: 'share_btn_click',
      params: {
        listing_id: listingId,
        userId: userId,
      }
    })
  }

  return (
    <div onClick={onShare} className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={onShare}
        className="
          relative
          hover:opacity-80
          transition
          cursor-pointer
          group-hover:opacity-80
        "
      >
        <BsFillShareFill size={20} className='fill-neutral-500/70' />
      </div>
      <span className="text-neutral-600 underline whitespace-nowrap">Chia sẻ</span>
    </div>
  );
}

export default ShareButton;