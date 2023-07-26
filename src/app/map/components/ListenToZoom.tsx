import { useMapEvents } from 'react-leaflet';

export default function ListenToZoom({ onZoom }: { onZoom: (newZoom: number) => void }) {
  const mapEvents = useMapEvents({
    zoomend: (e) => {
      onZoom(mapEvents.getZoom())
    }
  });

  return null
}