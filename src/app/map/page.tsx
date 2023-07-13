import { getListings } from "@/actions/getListings";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaListUl } from "react-icons/fa";
const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

export const revalidate = 3600 // revalidate this page every 60 minutes

export default async function MapPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getListings(searchParams)

  return (
    <>
      <div className="absolute left-[3.4rem] top-[18vh]">
        <FilterBar searchParams={searchParams} />
      </div>

      <div className="">
        <MapClient
          listings={listings}
          searchParams={searchParams}
        />
      </div>

      <div className="fixed bottom-12 left-[calc(50vw-86px)]">
        <Link href={{ pathname: "search", query: { ...searchParams } }} className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md">
          <span>Mở danh sách</span>
          <FaListUl />
        </Link>
      </div>
    </>
  )
}
