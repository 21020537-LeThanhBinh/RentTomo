'use client';

import FollowButton from "@/components/buttons/FollowButton";
import Profile from "@/components/profile/Profile";
import formatBigNumber from "@/utils/formatBigNumber";
import { parseAddressId } from "@/utils/parseAddress";
import Image from "next/image";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPersonFill, BsHouseFill } from "react-icons/bs";
import { FaRuler } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbCurrencyDong } from "react-icons/tb";
import { useMap } from "react-leaflet";

interface ListingCardProps {
  listing: any;
  userId: string | null;
  setHasFollowed?: (hasFollowed: boolean) => void;
};

const ListingCard: React.FC<ListingCardProps> = ({ listing, userId, setHasFollowed }) => {
  const map = useMap();
  const addressLabel = (listing.address + ', ' + parseAddressId(listing.address_id)).replace(/Phường |Quận |Tỉnh |Thành phố /g, '')

  return (
    <div className="group h-full">
      <div className="flex flex-col gap-4 h-full w-[300px]">
        <div className="aspect-[4/3] w-full absolute top-0 left-0 overflow-hidden rounded-t-xl">
          <Link href={`/listings/${listing.id}`} target="_blank">
            <Image
              fill
              src={listing.image_src[0]}
              alt="Listing"
              className="object-cover h-full w-full transition-opacity opacity-0 duration-1000"
              onLoadingComplete={(image: any) => image.classList.remove('opacity-0')}
            />
          </Link>

          <div className="absolute top-3 right-3">
            <button onClick={() => map.closePopup()} title="Đóng" className="hover:opacity-80 transition">
              <IoCloseCircleOutline size={24} className="text-white absolute -top-[2px] -right-[2px]" />
              <AiFillCloseCircle size={20} className='fill-neutral-500/70' />
            </button>
          </div>

          <div className="absolute top-10 right-3">
            <FollowButton
              listingId={listing.id}
              userId={userId}
              setHasFollowed={setHasFollowed}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 relative mt-[256px]">
          <Link href={`/listings/${listing.id}`} className="font-semibold text-base whitespace-nowrap truncate" title={listing.title} target="_blank">
            {listing.title}
          </Link>

          <div className="font-light text-neutral-500 flex items-center gap-1">
            <BsHouseFill />
            <span className="whitespace-nowrap mr-1">{listing.category}</span>
            <FaRuler />
            <span className="whitespace-nowrap">{listing.area} m²</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <TbCurrencyDong />
            <div className="font-semibold">
              {formatBigNumber(listing.price)}
            </div>
            <div className="font-light">/ tháng</div>
          </div>
          <div className="font-light text-neutral-500 flex flex-1 items-end">
            <div className="flex items-center gap-1 w-full">
              <ImLocation className="flex-shrink-0" />
              <span className="whitespace-nowrap truncate block" title={addressLabel}>
                {addressLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-neutral-500 font-light">
            <BsFillPersonFill />
            <div className="flex items-center gap-4">
              {listing.members?.[0].id ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block whitespace-nowrap">Thành viên:</span>
                  <div className="flex-1 flex">
                    {listing.members.map((item: any) => (
                      <div key={item?.id} className="list-avatar">
                        <Profile
                          new_avatar_url={item?.new_avatar_url}
                          new_full_name={item?.new_full_name}
                          id={item?.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span className="whitespace-nowrap">Thành viên: Chưa có</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;