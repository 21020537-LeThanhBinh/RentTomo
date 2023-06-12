'use client';

import { IconType } from "react-icons";

import UtilityBox from "../UtilityBox";
import { utilities } from "../filter/Utilities";
import Heading from "../Heading";
// const Map = dynamic(() => import('../Map'), { 
//   ssr: false 
// });

interface ListingInfoProps {
  description: string;
  category: string | undefined;
  utility: string[];
  area: number;
  title: string;
  address: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  category,
  utility,
  area,
  title,
  address,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <Heading
        title={title}
      />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Thông tin phòng
      </div>
      <div className="flex flex-col gap-2 text-neutral-600">
        <span>Loại phòng: {category}</span>
        <span>Diện tích: {area} m²</span>
        <span>Địa chỉ: {address}</span>
      </div>
      <hr />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Tiện ích
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
        {utility.map((item) => (
          <div key={item} className="col-span-1">
            <UtilityBox
              label={item}
              icon={utilities.find((u) => u.label === item)?.icon as IconType}
            />
          </div>
        ))}
      </div>
      <hr />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Mô tả thêm
      </div>
      <div className="text-neutral-600">
        {description}
      </div>
      <hr />
      {/* <Map center={coordinates} /> */}
    </div>
  );
}

export default ListingInfo;