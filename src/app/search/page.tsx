import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import ListingCard from "@/components/listings/ListingCard";
import { supabase } from "@/supabase/supabase-app";
import { ISearchParams } from "@/types";

export const revalidate = 60 // revalidate this page every 60 seconds

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

export default async function SearchPage({ searchParams }: { searchParams: ISearchParams }) {
  const listings = await getListings();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <div className="flex gap-6 flex-col md:flex-row mt-8">
      <div className="w-full md:w-1/3">
        <FilterBar searchParams={searchParams}>
          <div className="absolute top-6 left-0 text-xl font-semibold text-center w-full">
            <span>Bộ lọc</span>
          </div>

          <div className="flex flex-col gap-4 mt-14">
            <div className="text-lg text-neutral-600 flex gap-2">
              <span className="whitespace-nowrap flex-1">- Loại phòng:</span>
              <span className="flex-1">
                {!searchParams.category ? (
                  'Tất cả'
                ) : (searchParams.category.match(/,/g) || []).length > 1 ? (
                  searchParams.category.split(',')[0] + " +" + (searchParams.category.match(/,/g) || []).length
                ) : (
                  searchParams.category?.replaceAll(',', ', ')
                )}
              </span>
            </div>

            <div className="text-lg text-neutral-600 flex gap-2">
              <span className="whitespace-nowrap flex-1">- Tầm giá:</span>
              <span className="flex-1">
                {(searchParams.minPrice || 0) + `${(searchParams.minPrice && (searchParams.minPrice != '0')) ? 'tr' : ''} - ` + (searchParams.maxPrice || 15) + "tr"}
              </span>
            </div>

            <div className="text-lg text-neutral-600 flex gap-2">
              <span className="whitespace-nowrap flex-1">- Diện tích:</span>
              <span className="flex-1">
                {(searchParams.minArea || 0) + `${(searchParams.minArea && (searchParams.minArea != '0')) ? 'm²' : ''} - ` + (searchParams.maxArea || 150) + "m²"}
              </span>
            </div>

            <div className="text-lg text-neutral-600 flex gap-2">
              <span className="whitespace-nowrap flex-1">- Tiện ích:</span>
              <span className="flex-1">
                {!searchParams.utility ? (
                  'Không'
                ) : (searchParams.utility.match(/,/g) || []).length > 1 ? (
                  searchParams.utility.split(',')[0] + " +" + (searchParams.utility.match(/,/g) || []).length
                ) : (
                  searchParams.category?.replaceAll(',', ', ')
                )}
                {searchParams.utility?.replaceAll(',', ', ')}
              </span>
            </div>

            <div className="text-lg text-neutral-600 flex gap-2">
              <span className="whitespace-nowrap flex-1">- Giới tính:</span>
              <span className="flex-1">
                {(!searchParams.isMale || searchParams.isMale == 'undefined') ? (
                  'Không'
                ) : searchParams.isMale == 'true' ? (
                  'Nam'
                ) : (
                  'Nữ'
                )}
              </span>
            </div>
          </div>
        </FilterBar>
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
  )
}
