'use client'

import { useEffect } from "react";
import { BiNavigation } from "react-icons/bi";
import { useMap } from "react-leaflet";

export default function NavigateYourLocation({ setYourPosition }: { setYourPosition: any }) {
  const map = useMap()

  useEffect(() => {
    map?.locate()
  }, [])

  return (
    <button className='leaflet-bar'>
      <a
        href="#"
        title="Định vị"
        onClick={(e) => {
          e.preventDefault()
          map?.locate().on("locationfound", function (e: any) {
            map.flyTo(e.latlng, 16);
            setYourPosition(e.latlng)
          });
        }}
      >
        <BiNavigation size={20} className='absolute top-[7px] left-[6px]' />
      </a>
    </button>
  )
}