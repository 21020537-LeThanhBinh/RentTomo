'use client'

import { supabase } from "@/supabase/supabase-app";
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
const FullMap = dynamic(() => import('./FullMap'), { ssr: false })

interface MapProps {
  listings?: any[]
  searchParams: any
  zoom0?: number
}

const MapClient: React.FC<MapProps> = ({ listings = [], searchParams, zoom0 = 14 }) => {
  const [session, setSession] = useState<any>(null);
  const [sessionEvent, setSessionEvent] = useState<any>(null);
  const [following, setFollowing] = useState<any[]>([])
  const [zoom, setZoom] = useState<number>(zoom0)
  const [listingsFiltered, setListingsFiltered] = useState<any[]>([])

  const filterListingByDistrictId = () => {
    const newListings: any[] = []
    for (let i = 0; i < listings.length; i += 1) {
      if (!newListings.some((list) => list.address_id.district_id === listings[i].address_id.district_id)) {
        newListings.push(listings[i])
      }
    }
    return newListings
  }

  const filterListingByWardId = () => {
    const newListings: any[] = []
    for (let i = 0; i < listings.length; i += 1) {
      if (!newListings.some((list) => list.address_id.ward_id === listings[i].address_id.ward_id)) {
        newListings.push(listings[i])
      }
    }
    return newListings
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setSessionEvent(event)
    })
  }, []);

  useEffect(() => {
    if (zoom >= 14) {
      setListingsFiltered(listings)
    } else if (zoom < 14 && zoom > 12) {
      setListingsFiltered(filterListingByWardId())
    } else {
      setListingsFiltered(filterListingByDistrictId())
    }
  }, [listings]);

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

  const onZoom = (newZoom: number) => {
    if (newZoom >= 14) {
      if (zoom < 14) setListingsFiltered(listings)
    } else if (newZoom < 14 && newZoom > 12) {
      if (zoom >= 14 || zoom <= 12) setListingsFiltered(filterListingByWardId())
    } else {
      if (zoom > 12) setListingsFiltered(filterListingByDistrictId())
    }

    setZoom(newZoom)
  }

  return (
    <FullMap
      listings={listingsFiltered}
      searchParams={searchParams}
      zoom0={zoom0}
      onZoom={onZoom}
      following={following}
      userId={session?.user?.id || null}
    />
  )
}

export default MapClient