import { useMapEvents } from 'react-leaflet';

export default function SetViewOnClick({ selectPoint }: { selectPoint?: (l: any) => void }) {
  const mapEvents = useMapEvents({
    click: (e) => {
      mapEvents.setView(e.latlng, mapEvents.getZoom(), {
        animate: true,
      })
      selectPoint?.(e.latlng)
    }
  });

  return null
}