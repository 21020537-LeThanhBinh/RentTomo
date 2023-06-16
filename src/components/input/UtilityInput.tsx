'use client';

import { IconType } from "react-icons";
import { CgScreenWide } from 'react-icons/cg';
import { FaToilet } from 'react-icons/fa';
import {
  GiCctvCamera,
  GiCookingPot,
  GiHouseKeys,
  GiWashingMachine,
  GiWindow
} from 'react-icons/gi';
import { IoBed } from 'react-icons/io5';
import { MdHeatPump, MdOutlinePets } from 'react-icons/md';
import { RiEBikeFill, RiFridgeFill } from 'react-icons/ri';
import { TbAirConditioning } from 'react-icons/tb';

import { AiFillClockCircle, AiOutlineWifi } from 'react-icons/ai';
import { BiCloset } from 'react-icons/bi';

export const utilities = [
  {
    label: 'WC riêng',
    icon: FaToilet,
    description: '',
  },
  {
    label: 'Chỗ để xe',
    icon: RiEBikeFill,
    description: '',
  },
  {
    label: 'Cửa sổ',
    icon: GiWindow,
    description: ''
  },
  {
    label: 'An ninh',
    icon: GiCctvCamera,
    description: ''
  },
  {
    label: 'Wifi',
    icon: AiOutlineWifi,
    description: ''
  },
  {
    label: 'Tự do',
    icon: AiFillClockCircle,
    description: ''
  },
  {
    label: 'Máy lạnh',
    icon: TbAirConditioning,
    description: ''
  },
  {
    label: 'Máy nước nóng',
    icon: MdHeatPump,
    description: ''
  },
  {
    label: 'Nhà bếp',
    icon: GiCookingPot,
    description: ''
  },
  {
    label: 'Tủ lạnh',
    icon: RiFridgeFill,
    description: ''
  },
  {
    label: 'Máy giặt',
    icon: GiWashingMachine,
    description: ''
  },
  {
    label: 'Giường',
    icon: IoBed,
    description: ''
  },
  {
    label: 'Tủ đồ',
    icon: BiCloset,
    description: ''
  },
  {
    label: 'Tivi',
    icon: CgScreenWide,
    description: ''
  },
  {
    label: 'Thú cưng',
    icon: MdOutlinePets,
    description: ''
  },
  {
    label: 'Không chung chủ',
    icon: GiHouseKeys,
    description: ''
  }
]

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
      <div className="flex-shrink-0 overflow-clip">
        {label}
      </div>
    </div>
  );
}

export default UtilityBox;