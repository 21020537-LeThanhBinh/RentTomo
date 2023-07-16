'use client'

import RangeMarker from "@/components/map/RangeMarker";
import { supabase } from "@/supabase/supabase-app";
import { School } from "@/types";
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
import ListingMarker from "./components/ListingMarker";
import SetViewOnClick from "@/components/map/SetViewOnClick";
import { convertPointToArrayCoordinates } from "@/utils/convertPointToCoordinates";

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
  const zoom = (
    searchParams.level === '2' ? 16
      : searchParams.level === '1' ? 14
        : searchParams.level === '0' ? 10
          : 6
  )

  const [session, setSession] = useState<any>(null);
  const [sessionEvent, setSessionEvent] = useState<any>(null);

  const [following, setFollowing] = useState<any[]>([])
  const [yourPosition, setYourPosition] = useState<any>(null)
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setSessionEvent(event)
    })
  }, []);

  useEffect(() => {
    if (!session?.user?.id || sessionEvent === "SIGNED_OUT") return
    if (following.length) return
    console.log("fetching follows")

    supabase
      .from('follows')
      .select("post_id")
      .eq('follower_id', session.user.id)
      .then(({ data, error }) => {
        setFollowing(data?.map((value) => value.post_id) || [])
        console.log(data?.map((value) => value.post_id))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionEvent, following])

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

          mapRef.current?.setView(center as L.LatLngExpression, zoom, { animate: true })
        }
      })
  }, [searchParams.location_id, searchParams.level])

  useEffect(() => {
    if (!searchParams.lng || !searchParams.lat) return setSelectedSchool(null)

    const selectingSchool = schoolsFull?.find((school) => school.lng == searchParams.lng && school.lat == searchParams.lat) || null
    setSelectedSchool(selectingSchool)

    mapRef.current?.setView([searchParams.lat, searchParams.lng], 14, { animate: true })
  }, [searchParams.lng, searchParams.lat])

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
            userId={session?.user?.id || null}
            key={listing.id}
          />
        )
      })}
    </MapContainer>
  )
}

export default MapClient