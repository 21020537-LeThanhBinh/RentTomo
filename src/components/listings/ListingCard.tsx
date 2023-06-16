'use client';

import { supabase } from "@/supabase/supabase-app";
import formatBigNumber from "@/utils/formatBigNumber";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsHouseFill } from "react-icons/bs";
import { FaRuler } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import Avatar from "../Avatar";
import HeartButton from "../HeartButton";
import Link from "next/link";

interface ListingCardProps {
  data: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
}) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  return (
    <div className="group h-full max-h-[180px]">
      <div className="flex gap-4 h-full">
        <Link href={`/listings/${data.id}`} className="aspect-[4/3] w-1/4 relative overflow-hidden rounded-xl flex-shrink-0">
          <Image
            fill
            src={data.imageSrc[0]}
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              userId={userId}
            />
          </div>
        </Link>

        <div className="flex-1 flex flex-col gap-2 relative w-2/3">
          <Link href={`/listings/${data.id}`} className="font-semibold text-lg h-1/5 whitespace-nowrap truncate">
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
              đ {formatBigNumber(price)}
            </div>
            {!reservation && (
              <div className="font-light">/ tháng</div>
            )}
          </div>
          <div className="font-light text-neutral-500 flex flex-1 items-end w-2/3 sm:w-1/2">
            <div className="flex items-center gap-1 w-full">
              <ImLocation />
              <span className="whitespace-nowrap truncate block">{data.address.replace(/Phường|Quận|Tỉnh|Thành phố/g, '')}</span>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-1/3 sm:w-1/2 h-4/5 flex flex-col justify-end text-neutral-500 font-light">
            <div className="px-4 flex items-center gap-4">
              {data.members.length ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block whitespace-nowrap">Thành viên:</span>
                  <div className="flex-1 flex">
                    {data.members.map((item: any) => (
                      <div key={item?.id} className="list-avatar">
                        <Avatar src={item?.avatar_url} />
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