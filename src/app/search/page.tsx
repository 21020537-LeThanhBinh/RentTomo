import { getListings } from "@/actions/getListings";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import ListingCard from "@/components/listing/ListingCard";
import { ISearchParams } from "@/types";
import Link from "next/link";
import { BiFilterAlt } from "react-icons/bi";
import { BsFillMapFill } from "react-icons/bs";
import Pagination from "../../components/Pagination";

export const revalidate = 86400 // revalidate this page everyday

export default async function SearchPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getListings(searchParams);

  return (
    <>
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="flex gap-6 flex-col lg:flex-row mt-6">
          <div>
            <div className="invisible lg:visible w-0 h-0 lg:w-[320px] lg:min-h-[65vh]">
              <FilterBar searchParams={searchParams} />
            </div>

            <div className="lg:hidden">
              <Link href={{ query: { ...searchParams, popup: 'filter' } }} className="border-[1px] rounded-lg p-4 flex gap-2 justify-center items-center">
                <div className="text-lg font-semibold flex gap-2 items-center">
                  <BiFilterAlt size={20} />
                  <span>Bộ lọc</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[calc(100%-344px)] flex flex-col gap-6 min-h-[65vh] relative">
            {listings?.length ? listings.map((listing: any) => (
              <ListingCard
                key={listing.id}
                data={listing}
              />
            )) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>

      <div className="my-8 flex justify-center">
        <Pagination searchParams={searchParams} itemsLength={count || 0} />
      </div>

      <div className="fixed bottom-12 left-[calc(50vw-80px)]">
        <Link href={{ pathname: "map", query: { ...searchParams } }} className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md border-[1px] border-white">
          <span>Mở bản đồ</span>
          <BsFillMapFill />
        </Link>
      </div>
    </>
  )
}
