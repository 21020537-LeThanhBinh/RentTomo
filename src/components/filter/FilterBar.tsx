import { ISearchParams } from "@/types";
import FilterBarClient from "./FilterBarClient";
import { BiFilterAlt } from "react-icons/bi";

export default function FilterBar({ searchParams }: { searchParams?: ISearchParams }) {
  return (
    <FilterBarClient
      searchParams={searchParams}
      className="
        p-6 border-[1px] border-black border-opacity-20 rounded-xl z-[10000] bg-white 
        hidden md:block sticky top-[104px] w-[320px] max-h-[518px]
      "
    >
      <div className="absolute top-6 left-24 text-xl font-semibold w-full flex gap-2 items-center">
        <BiFilterAlt size={24} />
        <span>Bộ lọc</span>
      </div>

      <div className="flex flex-col gap-4 mt-14">
        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Loại phòng:</span>
          <span className="flex-1">
            {!searchParams?.category ? (
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
            {(searchParams?.minPrice || 0) + `${(searchParams?.minPrice && (searchParams?.minPrice != '0')) ? 'tr' : ''} - ` + (searchParams?.maxPrice || 15) + "tr"}
          </span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Diện tích:</span>
          <span className="flex-1">
            {(searchParams?.minArea || 0) + `${(searchParams?.minArea && (searchParams?.minArea != '0')) ? 'm²' : ''} - ` + (searchParams?.maxArea || 150) + "m²"}
          </span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Bán kính:</span>
          <span className="flex-1">{searchParams?.range ? (searchParams.range + 'm') : 'Không'}</span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Tiện ích:</span>
          <span className="flex-1">
            {!searchParams?.utility ? (
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
            {(!searchParams?.isMale || searchParams.isMale == 'undefined') ? (
              'Không'
            ) : searchParams.isMale == 'true' ? (
              'Nam'
            ) : (
              'Nữ'
            )}
          </span>
        </div>
      </div>
    </FilterBarClient>
  )
}