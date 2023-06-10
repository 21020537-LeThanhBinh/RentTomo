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
      <div
        className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </div>
  )
}
