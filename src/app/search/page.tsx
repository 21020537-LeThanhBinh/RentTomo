import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import { supabase } from "@/supabase/supabase-app";

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
      author: profiles!posts_author_id_fkey (
        id,
        full_name,
        avatar_url
      ),
      followers: profiles!follows (
        id,
        full_name,
        avatar_url
      )
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
      <div className="mb-4 py-8 text-center border-2">
        Sắp xếp: Updating...
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <div className="mb-4 py-8 text-center border-2 w-full md:w-1/3 md:h-96">
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

      <div className="mt-4 py-8 text-center border-2">
        Pagination: Updating...
      </div>
    </div>
  )
}
