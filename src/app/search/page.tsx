import { getListings } from "@/actions/getListings";
import ListingCard from "@/app/search/ListingCard";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import Pagination from "./Pagination";
import Link from "next/link";
import { BsFillMapFill } from "react-icons/bs";

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function SearchPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getListings(searchParams);

  return (
    <>
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

          <div className="w-full lg:w-[calc(100%-344px)] flex flex-col gap-6 min-h-[65vh] relative">
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
      </div>

      <div className="mt-12 mb-32 flex justify-center">
        <Pagination itemsLength={count || 0} />
      </div>

      <div className="fixed bottom-12 left-0 w-full flex justify-center">
        <Link href={'/map?' + (new URLSearchParams(searchParams as any).toString())} className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md">
          <span>Mở bản đồ</span>
          <BsFillMapFill />
        </Link>
      </div>
    </>
  )
}
