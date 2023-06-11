'use client';

import { IconType } from "react-icons";

interface UtilityBoxProps {
  icon?: IconType,
  label: string;
  selected?: boolean;
}

const UtilityBox: React.FC<UtilityBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  return ( 
    <div
      className={`
        flex 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        transition
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      {Icon && <Icon size={26} />}
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
export default UtilityBox;