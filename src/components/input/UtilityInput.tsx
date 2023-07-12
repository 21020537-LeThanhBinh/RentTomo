'use client';

import { IconType } from "react-icons";
import { CgScreenWide } from 'react-icons/cg';
import { FaToilet } from 'react-icons/fa';
import { GiCctvCamera, GiCookingPot, GiHouseKeys, GiWashingMachine, GiWindow } from 'react-icons/gi';
import { IoBed } from 'react-icons/io5';
import { MdElevator, MdHeatPump, MdOutlinePets } from 'react-icons/md';
import { RiEBikeFill, RiFridgeFill } from 'react-icons/ri';
import { TbAirConditioning } from 'react-icons/tb';
import { AiFillClockCircle, AiOutlineWifi } from 'react-icons/ai';
import { BiCloset } from 'react-icons/bi';

export const utilities = [
  {
    label: 'WC riêng',
    icon: FaToilet,
    description: 'Tưởng tượng cảnh phải xếp hàng để đi vệ sinh xem',
  },
  {
    label: 'Chỗ để xe',
    icon: RiEBikeFill,
    description: 'Nên chọn những nơi có chỗ để xe rộng rãi, có bảo vệ',
  },
  {
    label: 'Thang máy',
    icon: MdElevator,
    description: 'Cần thiết cho những phòng ở tầng 4 trở lên',
  },
  {
    label: 'Cửa sổ',
    icon: GiWindow,
    description: 'Thoáng khí và có ánh sáng tự nhiên',
  },
  {
    label: 'An ninh',
    icon: GiCctvCamera,
    description: 'Bảo vệ, camera an ninh, ... có thể giúp bạn yên tâm hơn',
  },
  {
    label: 'Wifi',
    icon: AiOutlineWifi,
    description: 'Giúp bạn kết nối với thế giới'
  },
  {
    label: 'Tự do',
    icon: AiFillClockCircle,
    description: 'Thoải mái về thời gian ra vào phòng'
  },
  {
    label: 'Máy lạnh',
    icon: TbAirConditioning,
    description: 'Giúp cuộc sống dễ chịu hơn trong những ngày nắng nóng'
  },
  {
    label: 'Máy nước nóng',
    icon: MdHeatPump,
    description: 'Giúp cuộc sống dễ chịu hơn trong những ngày lạnh giá'
  },
  {
    label: 'Nhà bếp',
    icon: GiCookingPot,
    description: 'Tự nấu ăn, vừa tiết kiệm vừa healthy'
  },
  {
    label: 'Tủ lạnh',
    icon: RiFridgeFill,
    description: 'Mọi thứ đều tươi mới'
  },
  {
    label: 'Máy giặt',
    icon: GiWashingMachine,
    description: 'Tiết kiệm thời gian cho việc giặt quần áo'
  },
  {
    label: 'Giường',
    icon: IoBed,
    description: 'Không quá quan trọng vì có thể ngủ trên nền nhà'
  },
  {
    label: 'Tủ đồ',
    icon: BiCloset,
    description: 'Giúp mọi thứ ngăn nắp gọn gàng hơn'
  },
  {
    label: 'Tivi',
    icon: CgScreenWide,
    description: 'Ai còn xem tivi nữa chứ?'
  },
  {
    label: 'Thú cưng',
    icon: MdOutlinePets,
    description: 'Wow, bạn có thể có những người bạn nhỏ trong phòng!'
  },
  {
    label: 'Không chung chủ',
    icon: GiHouseKeys,
    description: 'Tự do hơn nhưng nên cân nhắc về an ninh'
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