import { getListings } from "@/actions/getListings";
import FilterBar from "@/components/filter/FilterBar";
import { ISearchParams } from "@/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaListUl } from "react-icons/fa";
const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

export const revalidate = 360 // revalidate this page every 60 seconds

export default async function MapPage({ searchParams }: { searchParams: ISearchParams }) {
  const { data: listings, count } = await getListings(searchParams)

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

      <div className="fixed bottom-12 left-[calc(50vw-86px)]">
        <Link href={{ pathname: "search", query: { ...searchParams } }} className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md">
          <span>Mở danh sách</span>
          <FaListUl />
        </Link>
      </div>
    </>
  )
}
