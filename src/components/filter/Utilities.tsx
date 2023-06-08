'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import UtilityBox from "../UtilityBox";
import Container from '../Container';


export const utilities = [
  {
    label: 'WC riêng',
    icon: TbBeach,
    description: '',
  },
  {
    label: 'Chỗ để xe',
    icon: GiWindmill,
    description: '',
  },
  {
    label: 'Cửa sổ',
    icon: MdOutlineVilla,
    description: ''
  },
  {
    label: 'An ninh',
    icon: TbMountain,
    description: ''
  },
  {
    label: 'Wifi',
    icon: TbPool,
    description: ''
  },
  {
    label: 'Tự do',
    icon: GiIsland,
    description: ''
  },
  {
    label: 'Chủ riêng',
    icon: GiBoatFishing,
    description: ''
  },
  {
    label: 'Máy lạnh',
    icon: FaSkiing,
    description: ''
  },
  {
    label: 'Máy nước nóng',
    icon: GiCastle,
    description: ''
  },
  {
    label: 'Nhà bếp',
    icon: GiCaveEntrance,
    description: ''
  },
  {
    label: 'Tủ lạnh',
    icon: GiForestCamp,
    description: ''
  },
  {
    label: 'Máy giặt',
    icon: BsSnow,
    description: ''
  },
  {
    label: 'Giường',
    icon: GiCactus,
    description: ''
  },
  {
    label: 'Tủ đồ',
    icon: GiBarn,
    description: ''
  },
  {
    label: 'Tivi',
    icon: IoDiamond,
    description: ''
  },
  {
    label: 'Thú cưng',
    icon: IoDiamond,
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