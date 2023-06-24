import { useEffect, useState } from "react";
import { CircleMarker, Marker, Tooltip, useMapEvents } from "react-leaflet";

export default function RangeMarker({ coordinates, range, label }: { coordinates: any, range: number, label: string }) {
  const [center, setCenter] = useState<any>([21.0283207, 105.8540217])
  const [zoom, setZoom] = useState<number>(5)
  const [radius, setRadius] = useState<number>(0)
  const [zooming, setZooming] = useState<boolean>(false)

  const mapEvents = useMapEvents({
    zoomstart: () => {
      setZooming(true)
    },
    zoomend: () => {
      setZoom(mapEvents.getZoom());
      setZooming(false)
    },
    moveend: () => {
      setCenter(mapEvents.getCenter());
    }
  });

  useEffect(() => {
    const newRadius = range / (40075016.686 * Math.abs(Math.cos(center.lat * Math.PI / 180)) / Math.pow(2, zoom + 8))

    newRadius && setRadius(newRadius)
  }, [zoom])

  return !zooming && (
    <CircleMarker
      center={coordinates}
      pathOptions={{ color: 'red' }}
      radius={radius}
      interactive={false}
      opacity={0.3}
    >
      <Marker
        position={coordinates}
      >
        <Tooltip direction="top" offset={[-15, 0]}>
          {label}
        </Tooltip>
      </Marker>
    </CircleMarker>
  )
}