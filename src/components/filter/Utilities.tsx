'use client';

import { usePathname, useSearchParams } from 'next/navigation';
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
import Container from '../Container';
import UtilityBox from "../UtilityBox";


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

const Utilities = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {utilities.map((item) => (
          <UtilityBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Utilities;