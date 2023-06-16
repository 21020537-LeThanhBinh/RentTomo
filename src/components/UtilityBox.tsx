'use client';

import { IconType } from "react-icons";
import { utilities } from "./input/UtilityInput";

interface UtilityBoxProps {
  label: string;
  selected?: boolean;
}

const UtilityBox: React.FC<UtilityBoxProps> = ({
  label,
  selected,
}) => {
  const Icon = utilities.find((u) => u.label === label)?.icon as IconType

  return ( 
    <div
      className={`
        flex 
        items-center 
        gap-2
        p-2
        border-b-2
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-600'}
      `}
    >
      {Icon && <Icon size={26} className="flex-shrink-0" />}
      <div className="whitespace-nowrap truncate">
        {label}
      </div>
    </div>
   );
}
 
export default UtilityBox;