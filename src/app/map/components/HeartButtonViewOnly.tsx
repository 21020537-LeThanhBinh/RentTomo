'use client';

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface HeartButtonViewOnlyProps {
  hasFollowed?: boolean
}

const HeartButtonViewOnly: React.FC<HeartButtonViewOnlyProps> = ({ hasFollowed }) => {
  return (
    <div className="relative">
      <BsBookmark size={18} className={`absolute -top-[1px] -right-[1px] ${hasFollowed ? 'fill-white' : 'opacity-0'}`} />
      <BsBookmarkFill size={16} className={hasFollowed ? 'fill-sky-500' : 'opacity-0'} />
    </div>
  );
}

export default HeartButtonViewOnly;