'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleMarker, Marker, Tooltip, useMapEvents } from "react-leaflet";

export default function RangeMarker({
  coordinates,
  range,
  label,
  color = 'red',
  zoom_0 = 10,
}: {
  coordinates: any,
  range: number,
  label: string,
  color?: string,
  zoom_0?: number,
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [zoom, setZoom] = useState<number>(zoom_0)
  const [radius, setRadius] = useState<number>(0)
  const [zooming, setZooming] = useState<boolean>(false)
  const [hide, setHide] = useState<boolean>(zoom_0 < 11)

  const mapEvents = useMapEvents({
    zoomstart: () => {
      setZooming(true)
    },
    zoomend: () => {
      setZoom(mapEvents.getZoom());
      setHide(mapEvents.getZoom() < 11)
      setTimeout(() => {
        setZooming(false)
      }, 100);
    },
  });

  useEffect(() => {
    const newRadius = range / (40075016.686 * Math.abs(Math.cos(coordinates.lat * Math.PI / 180)) / Math.pow(2, zoom + 8))

    newRadius && setRadius(newRadius)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, range])

  const onClick = () => {
    const params = new URLSearchParams(searchParams as any)
    if (coordinates.lng == searchParams.get('lng') && coordinates.lat == searchParams.get('lat')) {
      params.delete("lng")
      params.delete("lat")
      params.delete("range")
    } else {
      params.set('lng', coordinates.lng.toString())
      params.set('lat', coordinates.lat.toString())
      params.set('range', Math.max(range, 2000).toString())
    }
    router.push('/map?' + params.toString())
  }

  return !hide && (
    <>
      {!zooming && (
        <CircleMarker
          center={coordinates}
          pathOptions={{ color: color }}
          radius={radius}
          interactive={false}
          opacity={0.3}
        />
      )}
      <Marker
        position={coordinates}
        eventHandlers={{
          click: onClick
        }}
      >
        <Tooltip direction="top" offset={[-15, 0]}>
          {label}
        </Tooltip>
      </Marker>
    </>
  )
}