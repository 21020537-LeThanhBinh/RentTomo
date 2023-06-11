'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import UtilityBox from "../UtilityBox";
import { utilities } from "../filter/Utilities";
// import ListingCategory from "./ListingCategory";

// const Map = dynamic(() => import('../Map'), { 
//   ssr: false 
// });

interface ListingInfoProps {
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
  } | null,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: string | undefined;
  locationValue: string;
  utility: string[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount = 0,
  roomCount = 0,
  bathroomCount = 0,
  category,
  locationValue,
  utility
}) => {
  // const { getByValue } = useCountries();

  // const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.full_name || user?.id}</div>
          <Avatar src={user?.avatar_url} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {/* {category && (
        <ListingCategory
          // icon={category.icon} 
          label={category}
          // description={category?.description} 
        />
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
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
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      {/* <Map center={coordinates} /> */}
    </div>
  );
}

export default ListingInfo;