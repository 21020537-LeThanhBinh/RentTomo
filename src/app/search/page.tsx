import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import ListingCard from "@/components/listings/ListingCard";
import { supabase } from "@/supabase/supabase-app";
import Pagination from "./Pagination";

export const revalidate = 60 // revalidate this page every 60 seconds

interface HomeProps {
  // searchParams: IListingsParams
  searchParams: any
};

async function getListings() {
  let { data, error } = await supabase
    .from('posts')
    .select(`
      id, title, address, area, category, created_at, imageSrc, price, utility, 
      members: profiles!rooms (id, full_name, avatar_url, description, contact)
    `)
    .order('created_at', { ascending: false })

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return []
  }
}

export default async function SearchPage({ searchParams }: HomeProps) {
  const listings = await getListings();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {/* <div className="py-8 text-center border-2">
        Sắp xếp: Updating...
      </div> */}

      <div className="flex gap-6 flex-col md:flex-row mt-8">
        <div className="w-full md:w-2/5">
          <FilterBar />
        </div>

        <div className="w-full flex flex-col gap-6">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 mb-8 flex justify-center">
        <Pagination />
      </div>
    </div>
  )
}
