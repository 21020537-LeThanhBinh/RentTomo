'use client'

import RangeMarker from "@/components/map/RangeMarker";
import SetViewOnClick from "@/components/map/SetViewOnClick";
import { supabase } from "@/supabase/supabase-app";
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

interface MapProps {
  listings?: any[]
  searchParams: any
}

const MapClient: React.FC<MapProps> = ({ listings, searchParams }) => {
  const mapRef = useRef<any>()
  const router = useRouter()
  const [session, setSession] = useState<any>(null);
  const [sessionEvent, setSessionEvent] = useState<any>(null);
  const [following, setFollowing] = useState<any[]>([])
  const [yourPosition, setYourPosition] = useState<any>(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setSessionEvent(event)
    })
  }, []);

  useEffect(() => {
    if (!session) return setFollowing([])
    console.log("session changed, fetching follows")

    supabase
      .from('follows')
      .select("*")
      .eq('follower_id', session.user.id)
      .then(({ data, error }) => {
        setFollowing(data?.map((value) => value.post_id) || [])
        console.log(data?.map((value) => value.post_id))
      })
  }, [sessionEvent])

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
          const zoom = (searchParams.level === '2' ? 16 : searchParams.level === '1' ? 14 : searchParams.level === '0' ? 10 : 6)

          mapRef.current?.setView(center as L.LatLngExpression, zoom, { animate: true })
        }
      })
  }, [searchParams.location_id, searchParams.level])

  return (
    <MapContainer
      center={[21.0283207, 105.8540217]}
      zoom={10}
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
      minZoom={6}
      className='h-[89vh]'
    >
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
                setYourPosition(e.latlng)
              });
            }}
          >
            <BiNavigation size={20} className='absolute top-[6px] left-[6px]' />
          </a>
        </button>
      </Control>

      <Control position='topleft'>
        <button className='leaflet-bar'>
          <a
            href=""
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

        <LayersControl.Overlay checked name="Các trường đại học">
          <LayerGroup>
            {schools.map((school) => {
              return (
                <RangeMarker
                  coordinates={{ lat: school.lat, lng: school.lng }}
                  range={school.range}
                  label={school.Name}
                  key={school.Id}
                />
              )
            })}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* Delete later */}
      <SetViewOnClick
        selectPoint={(point) => {
          console.log(JSON.stringify(point))
        }}
      />

      {yourPosition && (
        <Marker position={yourPosition} icon={iconPerson}>
          <Tooltip direction="top">Bạn đang ở đây!</Tooltip>
        </Marker>
      )}

      {listings?.map((listing) => {
        const coordinates = listing.location?.match(/POINT\(([^)]+)\)/)?.[1].split(" ");
        if (!coordinates) return null

        return (
          <ListingMarker
            coordinates={[parseFloat(coordinates[1]), parseFloat(coordinates[0])]}
            listing={listing}
            initHasFollowed={following.includes(listing.id)}
            userId={session?.user?.id || null}
            key={listing.id}
          />
        )
      })}
    </MapContainer>
  )
}

export default MapClient