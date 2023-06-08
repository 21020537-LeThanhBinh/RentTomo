'use client';

import { IconType } from "react-icons";

interface UtilityBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const UtilityBox: React.FC<UtilityBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick
}) => {
  return ( 
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div>
        {label}
      </div>
    </div>
   );
}
 
export default UtilityBox;