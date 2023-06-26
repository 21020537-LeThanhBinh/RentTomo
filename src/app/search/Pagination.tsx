'use client'

import { createQueryString } from "@/utils/queryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Pagination({ itemsLength, itemsPerPage = 10 }: { itemsLength: number, itemsPerPage?: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageCount = Math.ceil(itemsLength / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % itemsLength;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );

    router.push(pathname + '?' + createQueryString(searchParams, "page", event.selected + 1))
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex items-center gap-4"
        pageLinkClassName="text-sm font-semibold w-9 h-9 flex justify-center items-center rounded-full hover:bg-neutral-100 transition cursor-pointer"
        activeLinkClassName="bg-neutral-800 text-neutral-100 hover:bg-neutral-800 cursor-default"
        previousClassName="text-sm font-semibold w-9 h-9 flex justify-center items-center rounded-full hover:bg-neutral-100 transition cursor-pointer"
        nextClassName="text-sm font-semibold w-9 h-9 flex justify-center items-center rounded-full hover:bg-neutral-100 transition cursor-pointer"
      />
    </>
  );
}