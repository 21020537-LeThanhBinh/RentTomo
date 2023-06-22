import { useMapEvent } from 'react-leaflet';

export default function SetViewOnClick({ setSelectedPoint }: { setSelectedPoint: (l: any) => void }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
    setSelectedPoint(e.latlng)
  })

  return null
}