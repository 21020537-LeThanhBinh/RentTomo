'use client'

import RangeMarker from "@/components/map/RangeMarker";
import SetViewOnClick from "@/components/map/SetViewOnClick";
import { parseAddressIdSingle } from "@/utils/parseAddress";
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect, useRef, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import schools from '../../../public/DaiHocCaoDangVN.json' assert { type: 'json' };
import { useRouter } from "next/navigation";
import { createQueryString } from "@/utils/queryString";

const provider = new OpenStreetMapProvider();

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  listings?: any[]
  searchParams: any
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MapClient: React.FC<MapProps> = ({ listings, searchParams }) => {
  const mapRef = useRef<any>()
  const [center, setCenter] = useState<any>([21.0283207, 105.8540217])
  const [zoom, setZoom] = useState<number>(5)
  const router = useRouter()

  useEffect(() => {
    const addressLabel = parseAddressIdSingle(searchParams.location_id)
    if (!addressLabel) return
    provider
      .search({ query: addressLabel.replace(/Phường|Quận|Tỉnh|Thành phố/g, '') })
      .then((results) => {
        if (results.length > 0) {
          setCenter([results[0].y, results[0].x])
          setZoom(searchParams.level === '2' ? 16 : searchParams.level === '1' ? 14 : searchParams.level === '0' ? 10 : 6)
        }
      })
  }, [searchParams.location_id, searchParams.level])

  useEffect(() => {
    if (!center || !zoom) return

    mapRef.current?.setView(center as L.LatLngExpression, zoom, {
      animate: true,
    })
  }, [zoom, center])

  useEffect(() => {
    mapRef.current?._onZoomTransitionEnd(() => {
      console.log(mapRef.current)
    })

    //console.log(1000 / (40075016.686 * Math.abs(Math.cos(mapRef.current?.getCenter().lat * Math.PI / 180)) / Math.pow(2, mapRef.current?.getZoom() + 8)))
  }, [mapRef.current])

  return (
    <MapContainer
      center={center as L.LatLngExpression || [21.0283207, 105.8540217]}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      ref={mapRef}
      //@ts-ignore
      fullscreenControl={true}
      //@ts-ignore
      scrollWheelZoom={true}
      placeholder={
        <p>
          Bản đồ Việt Nam.{' '}
          <noscript>Hãy cho phép JavaScript để hiển thị bản đồ.</noscript>
        </p>
      }
      maxZoom={18}
      className='h-[88vh]'
    >
      <ZoomControl position='topright' />

      <Control position='topleft'>
        <button className='leaflet-bar'>
          <a href="" onClick={(e) => {
            e.preventDefault()
            router.push('/map?' + createQueryString(searchParams, 'popup', 'filter'))
          }} className=''>
            <BiFilterAlt size={20} className='absolute top-[6px] left-[6px]' />
          </a>
        </button>
      </Control>

      <TileLayer
        url={url}
        attribution={attribution}
      />

      <SetViewOnClick
        selectPoint={(point) => {
          console.log(JSON.stringify(point))
        }}
      />

      {schools.map((school) => {
        return (
          <RangeMarker
            coordinates={{ lat: school.lat, lng: school.lng }}
            range={school.range}
            label={school.Name}
          />
        )
      })}

      {listings?.map((listing) => {
        const coordinates = listing.location?.match(/POINT\(([^)]+)\)/)?.[1].split(" ");
        if (!coordinates) return null

        return (
          <CircleMarker
            center={[parseFloat(coordinates[1]), parseFloat(coordinates[0])]}
            pathOptions={{ color: 'transparent' }}
            radius={20}
            key={listing.id}
          >
            <Tooltip direction="center" opacity={1} permanent>
              {(parseInt(listing.price) / 1000000).toFixed(1) + 'tr'}
            </Tooltip>
            <Popup>
              {listing.title}
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

export default MapClient