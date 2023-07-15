import { getListings } from "@/actions/getListings";
import ListingCard from "@/components/listing/ListingCard";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import Link from "next/link";
import { BsFillMapFill } from "react-icons/bs";
import Pagination from "../../components/Pagination";

export const revalidate = 86400 // revalidate this page everyday

export default async function SearchPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getListings(searchParams);

  return (
    <>
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="flex gap-6 flex-col lg:flex-row mt-6">
          <div className="hidden lg:block w-[320px]">
            <FilterBar searchParams={searchParams} />
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

      <div className="my-12 flex justify-center">
        <Pagination itemsLength={count || 0} />
      </div>

      <div className="fixed bottom-12 left-[calc(50vw-73px)]">
        <Link href={{ pathname: "map", query: { ...searchParams } }} className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md">
          <span>Mở bản đồ</span>
          <BsFillMapFill />
        </Link>
      </div>
    </>
  )
}
