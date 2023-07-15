'use client';

import { BsFillShareFill } from "react-icons/bs";

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
      url: `https://developer.mozilla.org/${listingId}`
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