import FilterBar from "@/components/filter/FilterBar";
import { supabase } from "@/supabase/supabase-app";
import { ISearchParams } from "@/types";
import dynamic from "next/dynamic";
const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

export const revalidate = 60 // revalidate this page every 60 seconds

async function getListings(searchParams: ISearchParams) {
  let query

  if (searchParams.lat && searchParams.lng) {
    query = supabase
      .rpc('near_school_x_meters', { lat: parseFloat(searchParams.lat), long: parseFloat(searchParams.lng), x: 5000 })
  } else {
    query = supabase
      .from('posts_members')
      .select(`id, title, address, address_id, area, category, created_at, image_src, price, utility, location_text, members`)
  }

  if (searchParams.location_id && searchParams.level) {
    if (searchParams.level === '0') {
      query = query.eq('address_id->>city_id', searchParams.location_id)
    } else if (searchParams.level === '1') {
      query = query.eq('address_id->>district_id', searchParams.location_id)
    } else if (searchParams.level === '2') {
      query = query.eq('address_id->>ward_id', searchParams.location_id)
    }
  }

  if (searchParams.category)
    query = query.in('category', searchParams.category.split(','))

  if (searchParams.minPrice && searchParams.minPrice != "0")
    query = query.gte('price', Math.round(parseFloat(searchParams.minPrice)) * 1000000)
  if (searchParams.maxPrice && parseFloat(searchParams.maxPrice) < 15)
    query = query.lte('price', Math.round(parseFloat(searchParams.maxPrice)) * 1000000)

  if (searchParams.minArea && searchParams.minArea != "0") 
    query = query.gte('area', searchParams.minArea)
  if (searchParams.maxArea && parseFloat(searchParams.maxArea) < 150)
    query = query.lte('area', searchParams.maxArea)

  if (searchParams.utility)
    query = query.contains('utility', searchParams.utility.split(','))

  if (searchParams.isMale && searchParams.isMale !== "undefined")
    query = query.or(`members.cs.${JSON.stringify([{ is_male: (searchParams.isMale == 'true') }])}, members.cs.${JSON.stringify([{ is_male: null }])}`)

  if (!searchParams.lat || !searchParams.lng)
    query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return []
  }
}

export default async function MapPage({ searchParams }: { searchParams: ISearchParams }) {
  const listings = await getListings(searchParams)

  return (
    <>
      <div className="absolute left-[3.4rem] top-[18vh]">
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
              <span className="whitespace-nowrap flex-1">- Bán kính:</span>
              <span className="flex-1">{searchParams.range ? (searchParams.range + 'm') : 'Không'}</span>
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

      <div className="">
        <MapClient
          listings={listings}
          searchParams={searchParams}
        />
      </div>
    </>
  )
}
