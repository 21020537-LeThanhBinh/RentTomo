'use client';

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface HeartButtonViewOnlyProps {
}

const HeartButtonViewOnly: React.FC<HeartButtonViewOnlyProps> = ({}) => {
  return (
    <div className="relative">
      <BsBookmark size={20} className="fill-white absolute -top-[2px] -right-[2px]" />
      <BsBookmarkFill size={16} className={true ? 'fill-sky-500' : 'fill-neutral-500/70'} />
    </div>
  );
}

export default HeartButtonViewOnly;