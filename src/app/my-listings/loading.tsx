import FilterBarPlaceholder from "@/components/filter/FilterBarPlaceholder";
import ListingCardPlaceholder from "@/components/listing/ListingCardPlaceholder";
import Link from "next/link";
import { BiFilterAlt } from "react-icons/bi";

export default function loading() {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="flex gap-6 flex-col lg:flex-row mt-6">
        <div>
          <div className="invisible lg:visible w-0 h-0 lg:w-[320px] lg:min-h-[65vh]">
            <FilterBarPlaceholder />
          </div>

          <div className="lg:hidden">
            <Link href="#" className="border-[1px] rounded-lg p-4 flex gap-2 justify-center items-center">
              <div className="text-lg font-semibold flex gap-2 items-center">
                <BiFilterAlt size={20} />
                <span>Bộ lọc</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[calc(100%-344px)] flex flex-col gap-6 min-h-[65vh] relative">
          <ListingCardPlaceholder />
          <ListingCardPlaceholder />
          <ListingCardPlaceholder />
          <ListingCardPlaceholder />
          <ListingCardPlaceholder />
        </div>
      </div>
    </div>
  )
}
