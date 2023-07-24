import ListingCard from "@/components/listing/ListingCard";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import Pagination from "../../components/Pagination";
import { getMyListings } from "@/actions/getMyListings";
import Link from "next/link";
import { BiFilterAlt } from "react-icons/bi";

export const revalidate = 0 // new page every time

export default async function MyListingsPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getMyListings(searchParams);

  return (
    <>
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="flex gap-6 flex-col lg:flex-row mt-6">
          <div>
            <div className="invisible lg:visible w-0 h-0 lg:w-[320px] lg:h-full">
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
                hasOptions
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
    </>
  )
}
