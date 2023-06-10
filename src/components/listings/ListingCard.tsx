'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { format } from 'date-fns';

// import useCountries from "@/app/hooks/useCountries";
import {
  SafeListing,
  SafeReservation
} from "@/types";

// import HeartButton from "../HeartButton";
import formatBigNumber from "@/utils/formatBigNumber";
import Button from "../Button";
import HeartButton from "../HeartButton";
import { supabase } from "@/supabase/supabase-app";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
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
  // const { getByValue } = useCountries();

  // const location = getByValue(data.locationValue);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  // const reservationDate = useMemo(() => {
  //   if (!reservation) {
  //     return null;
  //   }

  //   const start = new Date(reservation.startDate);
  //   const end = new Date(reservation.endDate);

  //   return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  // }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc[0]}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton
              listingId={data.id}
              userId={userId}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {/* {location?.region}, {location?.label} */}
          {data.title}
        </div>
        <div className="font-light text-neutral-500">
          {/* {reservationDate || data.category} */}
          {data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            đ {formatBigNumber(price)}
          </div>
          {!reservation && (
            <div className="font-light">/ tháng</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;