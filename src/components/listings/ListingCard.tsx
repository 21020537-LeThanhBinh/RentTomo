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
    <div onClick={() => router.push(`/listings/${data.id}`)} className="cursor-pointer group h-full">
      <div className="flex gap-4 h-full">
        <div className="aspect-[4/3] w-1/4 relative overflow-hidden rounded-xl">
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
        </div>

        <div className="flex flex-col justify-between">
          <div className="font-semibold text-lg">
            {/* {location?.region}, {location?.label} */}
            {data.title}
          </div>
          <div className="font-light text-neutral-500">
            {/* {data.category} */}
            {data.category}
          </div>
          <div className="font-light text-neutral-500">
            {data.area} m2
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              đ {formatBigNumber(price)}
            </div>
            {!reservation && (
              <div className="font-light">/ tháng</div>
            )}
          </div>
          <div className="font-light text-neutral-500">
            {data.address}
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
    </div>
  );
}

export default ListingCard;