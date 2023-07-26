import { getListings } from "@/actions/getListings";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import Link from "next/link";
import MapClient from "./MapClient";
import { FaListUl } from "react-icons/fa";

export const revalidate = 86400 // revalidate this page everyday

export default async function MapPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getListings(searchParams)
  const zoom0 = (searchParams.lng && searchParams.lat) ? 14
  : searchParams.level === '2' ? 16
    : searchParams.level === '1' ? 14
      : searchParams.level === '0' ? 12
        : 6

  return (
    <>
      <div className="absolute left-[3.4rem] top-[18vh]">
        <FilterBar searchParams={searchParams} />
      </div>

      <div className="">
        <MapClient
          listings={listings}
          searchParams={searchParams}
          zoom0={zoom0}
        />
      </div>

      <div className="fixed bottom-12 left-[calc(50vw-86px)]">
        <Link href={{ pathname: "search", query: { ...searchParams } }} className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md border-[1px] border-white">
          <span>Mở danh sách</span>
          <FaListUl />
        </Link>
      </div>
    </>
  )
}
