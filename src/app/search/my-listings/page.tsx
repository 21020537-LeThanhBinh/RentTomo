import ListingCard from "@/components/listing/ListingCard";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import Pagination from "../../../components/Pagination";
import { getMyListings } from "@/actions/getMyListings";

export const revalidate = 86400 // revalidate this page everyday

export default async function MyListingsPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getMyListings(searchParams);

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
                hasOptions
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
    </>
  )
}
