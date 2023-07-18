import { useMapEvents } from 'react-leaflet';

export default function SetPointOnDrag({ selectPoint }: { selectPoint?: (l: any) => void }) {
  const mapEvents = useMapEvents({
    drag: () => {
      selectPoint?.(mapEvents.getCenter())
    },
  });

  return null
}