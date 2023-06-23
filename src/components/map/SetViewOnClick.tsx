import { useMapEvent } from 'react-leaflet';

export default function SetViewOnClick({ selectPoint }: { selectPoint: (l: any) => void }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
    selectPoint(e.latlng)
  })

  return null
}