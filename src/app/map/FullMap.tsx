'use client'

import RangeMarker from "@/components/map/RangeMarker";
import { School } from "@/types";
import { convertPointToArrayCoordinates } from "@/utils/convertPointToCoordinates";
import { parseAddressIdSingle } from "@/utils/parseAddress";
import { createQueryString } from "@/utils/queryString";
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useRouter } from "next/navigation";
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect, useRef, useState } from 'react';
import { BiFilterAlt, BiNavigation } from "react-icons/bi";
import { LayerGroup, LayersControl, MapContainer, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import schools from '../../../public/DaiHocCaoDangVN.json' assert { type: 'json' };
import schoolsFull from '../../../public/DaiHocCaoDangVNFull.json' assert { type: 'json' };
import ListenToZoom from "./components/ListenToZoom";
import ListingMarker from "./components/ListingMarker";

const provider = new OpenStreetMapProvider();

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const iconPerson = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg",
  iconRetinaUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg",
  iconSize: [30, 30],
});

interface FullMapProps {
  listings?: any[]
  searchParams: any
  zoom0?: number
  onZoom: (zoom: number) => void
  following: any[]
  userId: string | null
}

const FullMap: React.FC<FullMapProps> = ({ listings = [], searchParams, zoom0 = 14, onZoom, following, userId }) => {
  const mapRef = useRef<any>()
  const router = useRouter()
  const [yourPosition, setYourPosition] = useState<any>(null)
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

  // Search by searchParams then center the map
  useEffect(() => {
    const addressLabel = parseAddressIdSingle(searchParams.location_id)
    if (!addressLabel) return

    provider
      .search({ query: (addressLabel + ", Việt Nam").replace(/Phường |Quận |Tỉnh |Thành phố /g, '') })
      .then((results) => {
        console.log(results)
        if (results.length > 0) {
          const center = [results[0].y, results[0].x]

          mapRef.current?.setView(center as L.LatLngExpression, zoom0, { animate: true })
        }
      })
  }, [searchParams.location_id, searchParams.level])

  useEffect(() => {
    if (!searchParams.lng || !searchParams.lat) return setSelectedSchool(null)

    const selectingSchool = schoolsFull?.find((school) => school.lng == searchParams.lng && school.lat == searchParams.lat) || null
    setSelectedSchool(selectingSchool)

    setTimeout(() => {
      mapRef.current?.setView([searchParams.lat, searchParams.lng], 14, { animate: true })
    }, 500)
  }, [searchParams.lng, searchParams.lat])

  return (
    <MapContainer
      center={[21.0283207, 105.8540217]}
      zoom={10}
      zoomControl={false}
      zoomSnap={0.5}
      wheelPxPerZoomLevel={90}
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
      minZoom={6}
      className='h-[89vh]'
    >
      <ZoomControl position='topright' />
      <Control position='topright'>
        <button className='leaflet-bar'>
          <a
            href="#"
            title="Định vị"
            onClick={(e) => {
              e.preventDefault()
              mapRef.current?.locate().on("locationfound", function (e: any) {
                mapRef.current.flyTo(e.latlng, 16);
                setYourPosition(e.latlng)
              });
            }}
          >
            <BiNavigation size={20} className='absolute top-[7px] left-[6px]' />
          </a>
        </button>
      </Control>

      <Control position='topleft'>
        <button className='leaflet-bar'>
          <a
            href="#"
            title="Filter Popup"
            onClick={(e) => {
              e.preventDefault()
              router.push('/map?' + createQueryString(searchParams, 'popup', 'filter'))
            }}
          >
            <BiFilterAlt size={20} className='absolute top-[6px] left-[6px]' />
          </a>
        </button>
      </Control>

      <LayersControl position="bottomright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution={"© OpenStreetMap"}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="ESRI satellite">
          <TileLayer
            url={"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
            attribution={"Tiles &copy; Esri &mdash"}
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked={!selectedSchool} name="Mật độ sinh viên ước tính các trường đại học">
          <LayerGroup>
            {schools.map((school) => {
              return (
                <RangeMarker
                  coordinates={{ lat: school.lat, lng: school.lng }}
                  range={school.range}
                  label={school.Name}
                  key={school.Id}
                  color={(school.Id === selectedSchool?.Id) ? "transparent" : "red"}
                />
              )
            })}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked={!!selectedSchool} name="Khu vực gần nơi đã chọn">
          <LayerGroup>
            <RangeMarker
              coordinates={(searchParams.lat && searchParams.lng) ? { lat: searchParams.lat, lng: searchParams.lng } : { lat: 21.01340, lng: 105.52707 }}
              range={searchParams.range || Math.max(selectedSchool?.range || 0, 2000)}
              label={selectedSchool?.Name || "Khu vực đã chọn"}
              color="green"
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* Console log clicked location */}
      {/* <SetViewOnClick
        selectPoint={(point) => {
          console.log(JSON.stringify(point))
        }}
      /> */}

      <ListenToZoom onZoom={onZoom} />

      {yourPosition && (
        <Marker position={yourPosition} icon={iconPerson}>
          <Tooltip direction="top">Bạn đang ở đây!</Tooltip>
        </Marker>
      )}

      {listings?.map((listing) => {
        const coordinates = convertPointToArrayCoordinates(listing.location_text);
        if (!coordinates) return null

        return (
          <ListingMarker
            coordinates={coordinates}
            listing={listing}
            initHasFollowed={following.includes(listing.id)}
            userId={userId}
            key={listing.id}
          />
        )
      })}
    </MapContainer>
  )
}

export default FullMap