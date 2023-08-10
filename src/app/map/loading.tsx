import FilterBarPlaceholder from "@/components/filter/FilterBarPlaceholder";
import Link from "next/link";
import { FaListUl } from "react-icons/fa";

export default function loading() {
  return (
    <>
      <div className="absolute left-[3.4rem] top-[18vh]">
        <FilterBarPlaceholder />
      </div>

      <div className="">
        {/* <MapClient
          listings={listings}
          searchParams={searchParams}
        /> */}
      </div>

      <div className="fixed bottom-12 left-[calc(50vw-86px)]">
        <Link href="#" className="flex items-center gap-2 py-3 px-5 bg-neutral-800 rounded-full text-white whitespace-nowrap transition font-semibold hover:scale-110 hover:shadow-md border-[1px] border-white">
          <span>Mở danh sách</span>
          <FaListUl />
        </Link>
      </div>
    </>
  )
}
