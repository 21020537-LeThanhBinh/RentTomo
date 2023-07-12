'use client'

import { useEffect, useState } from "react";
import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import HeartButtonViewOnly from "./HeartButtonViewOnly";
import ListingCard from "./ListingCard";

export default function ListingMarker({
  listing,
  coordinates,
  userId,
  initHasFollowed
}: {
  listing: any,
  coordinates: any,
  userId: string | null,
  initHasFollowed: boolean
}) {
  const [hasFollowed, setHasFollowed] = useState(false)

  useEffect(() => {
    setHasFollowed(initHasFollowed)
  }, [initHasFollowed])

  return (
    <CircleMarker
      center={coordinates}
      pathOptions={{ color: 'transparent' }}
      radius={20}
    >
      <Tooltip
        direction="center"
        opacity={1}
        permanent
      >
        <span>{(parseInt(listing.price) / 1000000).toFixed(1) + 'tr'}</span>
        <div className="absolute -right-1 -top-1">
          {hasFollowed && <HeartButtonViewOnly />}
        </div>
      </Tooltip>
      <Popup>
        <ListingCard
          listing={listing}
          userId={userId}
          setHasFollowed={setHasFollowed}
        />
      </Popup>
    </CircleMarker>
  )
}