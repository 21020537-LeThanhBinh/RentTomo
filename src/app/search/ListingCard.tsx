'use client';

import Profile from "@/components/profile/Profile";
import { supabase } from "@/supabase/supabase-app";
import formatBigNumber from "@/utils/formatBigNumber";
import { parseAddressId } from "@/utils/parseAddress";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsHouseFill } from "react-icons/bs";
import { FaRuler } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import FollowButton from "../../components/HeartButton";

interface ListingCardProps {
  data: any;
};

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  return (
    <div className="group h-full max-h-36">
      <div className="flex gap-4 h-full">
        <div className="aspect-[4/3] w-1/4 md:w-1/5 relative overflow-hidden rounded-xl flex-shrink-0">
          <Link href={`/listings/${data.id}`} target="_blank">
            <Image
              fill
              src={data.image_src[0]}
              alt="Listing"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </Link>
          <div className="absolute top-3 right-3">
            <FollowButton
              listingId={data.id}
              userId={userId}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 relative w-3/4 lg:w-4/5">
          <Link href={`/listings/${data.id}`} target="_blank" className="font-semibold text-lg h-1/5 whitespace-nowrap truncate">
            {data.title}
          </Link>

          <div className="font-light text-neutral-500 flex items-center gap-1 w-1/2">
            <BsHouseFill className="hidden sm:block" />
            <span className="whitespace-nowrap hidden sm:block mr-2">{data.category}</span>
            <FaRuler />
            <span className="whitespace-nowrap truncate block">{data.area} m²</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              đ {formatBigNumber(data.price)}
            </div>
            <div className="font-light">/ tháng</div>
          </div>
          <div className="font-light text-neutral-500 flex flex-1 items-end w-2/3 sm:w-1/2">
            <div className="flex items-center gap-1 w-full">
              <ImLocation className="flex-shrink-0" />
              <span className="whitespace-nowrap truncate block">
                {(data.address + ', ' + parseAddressId(data.address_id)).replace(/Phường|Quận|Tỉnh|Thành phố/g, '')}
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-1/3 sm:w-1/2 h-4/5 flex flex-col justify-end text-neutral-500 font-light">
            <div className="px-4 flex items-center gap-4">
              {data.members?.[0].id ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block whitespace-nowrap">Thành viên:</span>
                  <div className="flex-1 flex">
                    {data.members.map((item: any) => (
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
                <span className="hidden sm:block whitespace-nowrap">Thành viên: Chưa có</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;