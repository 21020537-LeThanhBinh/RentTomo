'use client';

import Avatar from "@/components/Avatar";
import HeartButton from "@/components/HeartButton";
import { supabase } from "@/supabase/supabase-app";
import formatBigNumber from "@/utils/formatBigNumber";
import { parseAddressId } from "@/utils/parseAddress";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillPersonFill, BsHouseFill } from "react-icons/bs";
import { FaRuler } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { TbCurrencyDong } from "react-icons/tb";

interface ListingCardProps {
  listing: any;
  userId: string | null;
  setHasFollowed?: (hasFollowed: boolean) => void;
};

const ListingCard: React.FC<ListingCardProps> = ({ listing, userId, setHasFollowed }) => {
  return (
    <div className="group h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="aspect-[4/3] w-full relative overflow-hidden rounded-xl flex-shrink-0">
          <Link href={`/listings/${listing.id}`} target="_blank">
            <Image
              fill
              src={listing.image_src[0]}
              alt="Listing"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </Link>
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={listing.id}
              userId={userId}
              setHasFollowed={setHasFollowed}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 relative">
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
              <span className="whitespace-nowrap truncate block" title={(listing.address + ', ' + parseAddressId(listing.address_id)).replace(/Phường |Quận |Tỉnh |Thành phố /g, '')}>
                {(listing.address + ', ' + parseAddressId(listing.address_id)).replace(/Phường |Quận |Tỉnh |Thành phố /g, '')}
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
                        <Avatar src={item?.avatar_url} />
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