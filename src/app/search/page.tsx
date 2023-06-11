import getListings from "@/actions/getListings";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

export const revalidate = 60 // revalidate this page every 60 seconds

interface HomeProps {
  // searchParams: IListingsParams
  searchParams: any
};

export default async function SearchPage({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="mb-4 py-8 text-center border-2">
        Sắp xếp: Updating...
      </div>

      <div className="flex gap-4">
        <div className="w-1/3 h-96 border-2">
          Bộ lọc: Updating...
        </div>

        <div className="w-full flex flex-col gap-8">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
