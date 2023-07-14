'use client'

import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect, useRef } from 'react';
import { BiNavigation } from 'react-icons/bi';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
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
  zoom?: number
  selectedPoint?: { lat: number, lng: number } | number[]
  setSelectedPoint?: (l: any) => void
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MiniMap: React.FC<MapProps> = ({ zoom, selectedPoint, setSelectedPoint }) => {
  const mapRef = useRef<any>()

  useEffect(() => {
    if (!selectedPoint || !zoom) return

    mapRef.current?.setView(selectedPoint as L.LatLngExpression, zoom, {
      animate: true,
    })
  }, [zoom, selectedPoint])

  return (
    <MapContainer
      center={selectedPoint as L.LatLngExpression || [51, -0.09]}
      zoom={zoom}
      zoomControl={false}
      ref={mapRef}
      //@ts-ignore
      fullscreenControl={true}
      //@ts-ignore
      scrollWheelZoom={true}
      style={{ cursor: 'crosshair' }}
      className="h-[35vh] rounded-lg z-0"
    >
      <SearchField />
      <ZoomControl position='topright' />
      <Control position='topright'>
        <button className='leaflet-bar'>
          <a
            href=""
            title="Định vị"
            onClick={(e) => {
              e.preventDefault()
              mapRef.current?.locate().on("locationfound", function (e: any) {
                mapRef.current.flyTo(e.latlng, 16);
                setSelectedPoint?.(e.latlng)
              });
            }}
          >
            <BiNavigation size={20} className='absolute top-[6px] left-[6px]' />
          </a>
        </button>
      </Control>

      <TileLayer
        url={url}
        attribution={attribution}
      />
      {selectedPoint && (
        <Marker position={selectedPoint as L.LatLngExpression} />
      )}
      <SetViewOnClick selectPoint={setSelectedPoint} />
    </MapContainer>
  )
}

export default MiniMap