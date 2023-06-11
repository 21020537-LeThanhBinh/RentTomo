'use client';

// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import { Range } from "react-date-range";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { differenceInDays, eachDayOfInterval } from 'date-fns';

import { SafeReservation } from "@/types";
import createQueryString from "@/utils/createQueryString";
import ListingHead from "@/components/listings/ListingHead";
import { supabase } from "@/supabase/supabase-app";
import ListingInfo from "@/components/listings/ListingInfo";

// import Container from "@/app/components/Container";
// import { categories } from "@/app/components/navbar/Categories";
// import ListingHead from "@/app/components/listings/ListingHead";
// import ListingInfo from "@/app/components/listings/ListingInfo";
// import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: any
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
}) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  // const disabledDates = useMemo(() => {
  //   let dates: Date[] = [];

  //   reservations.forEach((reservation: any) => {
  //     const range = eachDayOfInterval({
  //       start: new Date(reservation.startDate),
  //       end: new Date(reservation.endDate)
  //     });

  //     dates = [...dates, ...range];
  //   });

  //   return dates;
  // }, [reservations]);

  // const category = useMemo(() => {
  //    return categories.find((items) => 
  //     items.label === listing.category);
  // }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  // const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!userId) {
      // return loginModal.onOpen();
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'login'))
      return;
    }
    setIsLoading(true);

    // axios.post('/api/reservations', {
    //   totalPrice,
    //   startDate: dateRange.startDate,
    //   endDate: dateRange.endDate,
    //   listingId: listing?.id
    // })
    //   .then(() => {
    //     toast.success('Listing reserved!');
    //     setDateRange(initialDateRange);
    //     router.push('/trips');
    //   })
    //   .catch(() => {
    //     toast.error('Something went wrong.');
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   })
  },
    [
      totalPrice,
      // dateRange,
      listing?.id,
      router,
      userId,
      // loginModal
    ]);

  // useEffect(() => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     const dayCount = differenceInDays(
  //       dateRange.endDate,
  //       dateRange.startDate
  //     );

  //     if (dayCount && listing.price) {
  //       setTotalPrice(dayCount * listing.price);
  //     } else {
  //       setTotalPrice(listing.price);
  //     }
  //   }
  // }, [dateRange, listing.price]);

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {/* <div className="max-w-screen-lg mx-auto"> */}
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc[0]}
            address={listing.address}
            id={listing.id}
            userId={userId}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.author_id}
              category={listing.category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              utility={listing.utility}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              {/* <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              /> */}
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default ListingClient;
