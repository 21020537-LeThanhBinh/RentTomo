import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import ListingCard from "@/app/search/ListingCard";
import { supabase } from "@/supabase/supabase-app";
import { ISearchParams } from "@/types";
import Pagination from "./Pagination";

export const revalidate = 60 // revalidate this page every 60 seconds

async function getListings(searchParams: ISearchParams) {
  let query = supabase
    .from('posts_members')
    .select(`id, title, address, address_id, area, category, created_at, image_src, price, utility, members`)

  if (searchParams.location_id && searchParams.level) {
    if (searchParams.level === '0') {
      query = query.eq('address_id->>city_id', searchParams.location_id)
    }
    else if (searchParams.level === '1') {
      query = query.eq('address_id->>district_id', searchParams.location_id)
    }
    else if (searchParams.level === '2') {
      query = query.eq('address_id->>ward_id', searchParams.location_id)
    }
  }

  if (searchParams.category)
    query = query.in('category', searchParams.category.split(','))

  if (searchParams.minPrice)
    query = query.gte('price', parseFloat(searchParams.minPrice) * 1000000)
  if (searchParams.maxPrice && parseFloat(searchParams.maxPrice) < 15)
    query = query.lte('price', parseFloat(searchParams.maxPrice) * 1000000)

  if (searchParams.minArea) query = query.gte('area', searchParams.minArea)
  if (searchParams.maxArea && parseFloat(searchParams.maxArea) < 150)
    query = query.lte('area', searchParams.maxArea)

  if (searchParams.utility)
    query = query.contains('utility', searchParams.utility.split(','))

  if (searchParams.isMale && searchParams.isMale !== "undefined") 
    query = query.or(`members.cs.${JSON.stringify([{ is_male: (searchParams.isMale == 'true') }])}, members.cs.${JSON.stringify([{ is_male: null }])}`)

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return []
  }
}

export default async function SearchPage({ searchParams }: { searchParams: ISearchParams }) {
  const listings = await getListings(searchParams);

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="flex gap-6 flex-col lg:flex-row mt-6">
        <div className="hidden lg:block w-[320px]">
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
                    searchParams.utility?.replaceAll(',', ', ')
                  )}
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

        <div className="w-full lg:w-[calc(100%-360px)] flex flex-col gap-6 min-h-[65vh] relative">
          {listings.length ? listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
            />
          )) : (
            <EmptyState />
          )}
        </div>
      </div>

      <div className="mt-16 mb-8 flex justify-center">
        <Pagination />
      </div>
    </div>
  )
}
