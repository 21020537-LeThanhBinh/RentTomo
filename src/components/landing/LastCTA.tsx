import { Suspense } from "react";
import PostBtn from "../nav/PostBtn";
import SearchBar from "../nav/SearchBar";
import SearchBarFallback from "../nav/SearchBarFallback";

export default function LastCTA() {
  return (
    <div className="mt-32 w-screen bg-sky-500 flex flex-col gap-10 justify-center items-center px-8 py-[4.5rem] overflow-y-visible">
      <h1 className="text-2xl md:text-3xl font-bold text-white max-w-[16ch] text-center">
        Bắt đầu tìm kiếm hoặc đăng tin ngay
      </h1>

      <div className="flex gap-2 max-w-[33.75rem]">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        <PostBtn isWhite />
      </div>
    </div>
  )
}