'use client'

import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import SearchField from './SearchField';
import SetViewOnClick from './SetViewOnClick';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[]
  zoom?: number
  selectedPoint?: number[]
  setSelectedPoint: (l: any) => void
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MiniMap: React.FC<MapProps> = ({ center, zoom, selectedPoint, setSelectedPoint }) => {
  const mapRef = useRef<any>()

  useEffect(() => {
    if (!center || !zoom) return

    mapRef.current?.setView(center as L.LatLngExpression, zoom, {
      animate: true,
    })
  }, [zoom, center])

  return (
    <MapContainer
      center={center as L.LatLngExpression || [51, -0.09]}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      ref={mapRef}
      //@ts-ignore
      fullscreenControl={true}
      style={{ cursor: 'crosshair' }}
      className="h-[35vh] rounded-lg"
    >
      <SearchField />
      <ZoomControl position='topright' />
      <TileLayer
        url={url}
        attribution={attribution}
      />
      {center && (
        <Marker position={selectedPoint as L.LatLngExpression} />
      )}
      <SetViewOnClick selectPoint={setSelectedPoint} />
    </MapContainer>
  )
}

export default MiniMap